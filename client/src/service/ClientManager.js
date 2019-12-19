import io from 'socket.io-client';
import { useContext } from 'react';
import { DispatchContext } from '../contexts';
import GameManager from './GameManager';
import StreamingManager from './StreamingManager';
import ChattingManager from './ChattingManager';
import { browserLocalStorage, makeViewPlayerList } from '../utils';
import EVENTS from '../constants/events';
import actions from '../actions';
import {
  GAME_END_SCOREBOARD_TITLE,
  ROOM_UNAVAILABLE_MESSAGE,
} from '../constants/message';
import { SOCKETIO_SERVER_URL } from '../constants/socket';
import { GAME_STATUS, PLAYER_TYPES } from '../constants/game';
import LINK_PATH from '../constants/path';
import { LOCALSTORAGE_DEFAULT_NICKNAME } from '../constants/browser';
import { TOAST_TYPES } from '../constants/toast';

class ClientManager {
  constructor({ history, roomIdFromUrl, isPrivateRoomCreation, openToast }) {
    this.history = history;
    this.localPlayer = {
      isReady: false,
      nickname: '',
      type: PLAYER_TYPES.VIEWER,
      socketId: '',
      score: 0,
    };
    this.roomIdFromUrl = roomIdFromUrl;
    this.isRoomPrivate = !!roomIdFromUrl || isPrivateRoomCreation;
    this.isPrivateRoomCreation = isPrivateRoomCreation;
    this.socket = io(SOCKETIO_SERVER_URL);
    this.remotePlayers = {};
    this.gameManager = new GameManager({
      socket: this.socket,
      localPlayer: this.localPlayer,
      remotePlayers: this.remotePlayers,
      isRoomPrivate: this.isRoomPrivate,
    });
    this.streamingManager = new StreamingManager(
      this.socket,
      this.remotePlayers,
      this.localPlayer,
    );
    this.chattingManager = new ChattingManager(this.socket, this.isRoomPrivate);
    this.dispatch = useContext(DispatchContext);
    this.openToast = openToast;
  }

  registerSocketEvents() {
    this.socket.on(EVENTS.SEND_SOCKET_ID, this.sendSocketIdHandler.bind(this));
    this.socket.on(EVENTS.SEND_ROOMID, this.sendRoomIdHandler.bind(this));
    this.socket.on(
      EVENTS.SEND_LEFT_PLAYER,
      this.sendLeftPlayerHandler.bind(this),
    );
    this.socket.on(EVENTS.END_GAME, this.endGameHandler.bind(this));
    this.socket.on(EVENTS.RESET_GAME, this.resetGameHandler.bind(this));
    this.socket.on(EVENTS.DISCONNECT, this.disconnectHandler.bind(this));
    this.socket.on(
      EVENTS.ROOM_UNAVAILABLE,
      this.roomUnavailableHandler.bind(this),
    );
  }

  roomUnavailableHandler() {
    this.openToast(TOAST_TYPES.INFORMATION, ROOM_UNAVAILABLE_MESSAGE);
    this.exitRoom();
  }

  disconnectHandler() {
    this.streamingManager.resetWebRTC();
    this.history.push(LINK_PATH.MAIN_PAGE);
    this.dispatch(actions.reset());
    this.gameManager.timer.clear();
  }

  sendLeftPlayerHandler({ socketId }) {
    try {
      delete this.remotePlayers[socketId];
      const viewPlayerList = makeViewPlayerList(
        this.localPlayer,
        this.remotePlayers,
      );
      this.dispatch(actions.setViewPlayerList(viewPlayerList));
      this.streamingManager.closeConnection(socketId);
    } catch (e) {
      console.log(e);
    }
  }

  sendSocketIdHandler({ socketId }) {
    this.localPlayer.socketId = socketId;
  }

  addRoomIdToUrl(roomId) {
    this.history.replace({
      pathname: `${LINK_PATH.GAME_PAGE}/${roomId}`,
      isPrivateRoomCreation: this.isPrivateRoomCreation,
    });
  }

  showShareUrlButton() {
    this.dispatch(actions.setIsRoomIdReceived(true));
  }

  sendRoomIdHandler({ roomId }) {
    this.localPlayer.roomId = roomId;
    if (this.isRoomPrivate) {
      this.addRoomIdToUrl(roomId);
      this.showShareUrlButton();
    }
  }

  askSocketId() {
    this.socket.emit(EVENTS.ASK_SOCKET_ID);
  }

  findMatch(nickname) {
    this.localPlayer.nickname = nickname;
    this.gameManager.findMatch({
      nickname,
      roomIdFromUrl: this.roomIdFromUrl,
      isPrivateRoomCreation: this.isPrivateRoomCreation,
    });
  }

  toggleReady() {
    this.gameManager.toggleReady(this.localPlayer.isReady);
  }

  init() {
    this.registerSocketEvents();
    this.gameManager.registerSocketEvents();
    this.streamingManager.registerSocketEvents();
    this.askSocketId();
    /** @todo 닉네임 state에서 받아오도록 설정할 것 */
    this.findMatch(
      browserLocalStorage.getNickname() || LOCALSTORAGE_DEFAULT_NICKNAME,
    );
    this.chattingManager.registerSocketEvents();
    this.gameManager.setInactivePlayerBanTimer();
  }

  sendChattingMessage(newChatting) {
    this.chattingManager.sendChattingMessage(newChatting);
  }

  exitRoom() {
    this.gameManager.exitRoom();
  }

  endGameHandler({ scoreList }) {
    this.resetStreaming();
    this.resetReadyButton();
    this.dispatch(actions.clearWindow());
    this.dispatch(
      actions.setScoreNotice({
        isVisible: true,
        message: GAME_END_SCOREBOARD_TITLE,
        scoreList,
      }),
    );
    this.dispatch(actions.setCurrentSeconds(0));
    this.dispatch(actions.setQuiz('', 0));
    this.dispatch(actions.setChattingDisabled(false));
    this.dispatch(actions.setVideoVisibility(false));
    this.streamingManager.closeAllConnections();
  }

  resetReadyButton() {
    const viewPlayerList = makeViewPlayerList(
      this.localPlayer,
      this.remotePlayers,
    );
    this.dispatch(actions.setViewPlayerList(viewPlayerList));
  }

  resetStreaming() {
    this.localPlayer.isReady = false;
    this.streamingManager.resetWebRTC();
  }

  async getMediaPermission() {
    await this.streamingManager.getMediaPermission();
  }

  selectQuiz(quiz) {
    this.gameManager.selectQuiz(quiz);
  }

  resetGameHandler({ players }) {
    this.gameManager.syncAllPlayers(players);
    this.gameManager.makeAndDispatchViewPlayerList();
    this.streamingManager.resetWebRTC();
    this.dispatch(actions.clearWindow());
    this.dispatch(actions.setGameStatus(GAME_STATUS.WAITING));
    this.gameManager.setInactivePlayerBanTimer();
  }

  setHistoryInGameManager(history) {
    this.gameManager.setHistory(history);
  }

  setClientManagerInitialized(clientManagerInitialized) {
    this.dispatch(
      actions.setClientManagerInitialized(clientManagerInitialized),
    );
  }

  getIsRoomPrivate() {
    return this.isRoomPrivate;
  }
}

export default ClientManager;
