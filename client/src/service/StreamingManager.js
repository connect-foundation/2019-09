import { useContext } from 'react';
import { DispatchContext } from '../contexts';
import WebRTCManager from './WebRTCManager';
import { makeViewPlayerList } from '../utils';

class StreamingManager {
  constructor(socket, remotePlayers, localPlayer) {
    this.dispatch = useContext(DispatchContext);
    this.socket = socket;
    this.localPlayer = localPlayer;
    this.remotePlayers = remotePlayers;
    this.webRTCManager = new WebRTCManager();
  }

  registerSocketEvents() {
    this.socket.on('assignStreamer', this.assignStreamerHandler.bind(this));
    this.socket.on('assignViewer', this.assignViewerHandler.bind(this));
    this.socket.on('sendCandidate', this.sendCandidateHandler.bind(this));
    this.socket.on('sendDescription', this.sendDescriptionHandler.bind(this));
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
    // 자신의 로컬 스트림을 생성하면 View로 dispatch 추후 디스플레이여부는 View에서 관장
    // dispatch({ type: 'setStream', payload: { stream: webRTCManager.stream } });
    webRTCManager.createConnections(socketIds);
    webRTCManager.registerIceCandidates(
      socketIds,
      iceCandidateHandler.bind(this),
    );
    webRTCManager.addTracks(socketIds);
    const offers = await webRTCManager.createOfferDescriptions(socketIds);
    await webRTCManager.setLocalDescriptions(socketIds, offers);
    socketIds.forEach((socketId, index) => {
      socket.emit('sendDescription', {
        target: socketId,
        description: offers[index],
      });
    });
    const stream = webRTCManager.getStream();
    document.querySelector('video').srcObject = stream;
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

  async sendCandidateHandler({ target, candidate }) {
    await this.webRTCManager.addIceCandidate(target, candidate);
  }

  async sendDescriptionHandler({ target, description }) {
    const { webRTCManager, socket } = this;
    await webRTCManager.setRemoteDescription(target, description);
    if (description.type === 'answer') return;
    const answer = await webRTCManager.createAnswerDescription(target);
    await webRTCManager.setLocalDescription(target, answer);
    socket.emit('sendDescription', { target, description: answer });
  }

  iceCandidateHandler(socketId, event) {
    if (!event.candidate) return;
    this.socket.emit('sendCandidate', {
      target: socketId,
      candidate: event.candidate,
    });
  }

  trackHandler(stream) {
    /** @todo 추후 view의 dispatch 연결 */
    // eslint-disable-next-line
    console.log(this.dispatch);
    document.querySelector('video').srcObject = stream;
    // this.dispatch({ type: 'setStream', payload: { stream } });
  }

  closeConnection(socketId) {
    this.webRTCManager.closeConnection(socketId);
  }

  closeAllConnections() {
    this.webRTCManager.closeAllConnections();
  }

  resetWebRTC() {
    this.webRTCManager.closeAllConnections();
    this.webRTCManager.removeTracks();
    if (document.querySelector('video')) {
      document.querySelector('video').srcObject = null;
    }
    this.webRTCManager = new WebRTCManager();
  }
}

export default StreamingManager;
