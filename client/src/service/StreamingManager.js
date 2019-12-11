import { useContext } from 'react';
import { DispatchContext } from '../contexts';
import WebRTCManager from './WebRTCManager';
import { makeViewPlayerList } from '../utils';
import EVENTS from '../constants/events';

class StreamingManager {
  constructor(socket, remotePlayers, localPlayer) {
    this.dispatch = useContext(DispatchContext);
    this.socket = socket;
    this.localPlayer = localPlayer;
    this.remotePlayers = remotePlayers;
    this.webRTCManager = new WebRTCManager();
  }

  registerSocketEvents() {
    this.socket.on(
      EVENTS.ASSIGN_STREAMER,
      this.assignStreamerHandler.bind(this),
    );
    this.socket.on(EVENTS.ASSING_VIEWER, this.assignViewerHandler.bind(this));
    this.socket.on(
      EVENTS.SEND_ICE_CANDIDATE,
      this.sendIceCandidateHandler.bind(this),
    );
    this.socket.on(
      EVENTS.SEND_DESCRIPTION,
      this.sendDescriptionHandler.bind(this),
    );
  }

  async assignStreamerHandler() {
    const {
      webRTCManager,
      iceCandidateHandler,
      socket,
      dispatch,
      remotePlayers,
      localPlayer,
    } = this;

    localPlayer.type = 'streamer';
    const viewPlayerList = makeViewPlayerList(localPlayer, remotePlayers);
    dispatch({
      type: 'setViewPlayerList',
      payload: {
        viewPlayerList,
      },
    });

    const socketIds = Object.keys(remotePlayers);
    webRTCManager.closeAllConnections();
    await webRTCManager.createStream();

    webRTCManager.createConnections(socketIds);
    webRTCManager.registerIceCandidates(
      socketIds,
      iceCandidateHandler.bind(this),
    );
    webRTCManager.addTracks(socketIds);
    const offers = await webRTCManager.createOfferDescriptions(socketIds);
    await webRTCManager.setLocalDescriptions(socketIds, offers);
    socketIds.forEach((socketId, index) => {
      socket.emit(EVENTS.SEND_DESCRIPTION, {
        target: socketId,
        description: offers[index],
      });
    });
    const stream = webRTCManager.getStream();
    this.dispatch({ type: 'setStream', payload: { stream } });
  }

  async assignViewerHandler({ streamerSocketId }) {
    const { remotePlayers, localPlayer, dispatch } = this;
    const socketIds = Object.keys(remotePlayers);
    socketIds.forEach(socketId => {
      if (socketId === streamerSocketId) {
        remotePlayers[socketId].type = 'streamer';
      }
    });
    const viewPlayerList = makeViewPlayerList(localPlayer, remotePlayers);
    dispatch({
      type: 'setViewPlayerList',
      payload: {
        viewPlayerList,
      },
    });
    const { webRTCManager, iceCandidateHandler, trackHandler } = this;
    webRTCManager.createConnection(streamerSocketId);
    webRTCManager.registerIceCandidate(
      streamerSocketId,
      iceCandidateHandler.bind(this),
    );
    webRTCManager.registerTrack(streamerSocketId, trackHandler.bind(this));
  }

  async sendIceCandidateHandler({ target, iceCandidate }) {
    await this.webRTCManager.addIceCandidate(target, iceCandidate);
  }

  async sendDescriptionHandler({ target, description }) {
    const { webRTCManager, socket } = this;
    await webRTCManager.setRemoteDescription(target, description);
    if (description.type === 'answer') return;
    const answer = await webRTCManager.createAnswerDescription(target);
    await webRTCManager.setLocalDescription(target, answer);
    socket.emit(EVENTS.SEND_DESCRIPTION, { target, description: answer });
  }

  iceCandidateHandler(socketId, event) {
    if (!event.candidate) return;
    this.socket.emit(EVENTS.SEND_ICE_CANDIDATE, {
      target: socketId,
      iceCandidate: event.candidate,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  trackHandler(stream) {
    this.dispatch({ type: 'setStream', payload: { stream } });
    this.socket.emit(EVENTS.CONNECT_PEER);
  }

  closeConnection(socketId) {
    this.webRTCManager.closeConnection(socketId);
  }

  closeAllConnections() {
    this.webRTCManager.closeAllConnections();
  }

  async getMediaPermission() {
    await this.webRTCManager.getMediaPermission();
  }

  resetWebRTC() {
    this.webRTCManager.closeAllConnections();
    this.webRTCManager.removeTracks();
    this.webRTCManager = new WebRTCManager();
  }
}

export default StreamingManager;
