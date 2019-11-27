// import { useContext } from 'react';
// import { DispatchContext } from '../contexts';
import WebRTCManager from './WebRTCManager';

class StreamingManager {
  constructor(socket, remotePlayers) {
    // this.dispatch = useContext(DispatchContext).dispatch;
    this.socket = socket;
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
    } = this;
    const socketIds = Object.keys(remotePlayers);

    webRTCManager.closeAllConnections();
    await webRTCManager.createStream();
    // 자신의 로컬 스트림을 생성하면 View로 dispatch 추후 디스플레이여부는 View에서 관장
    dispatch({ type: 'setStream', payload: { stream: webRTCManager.stream } });
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
  }

  async assignViewerHandler({ streamerSocketId }) {
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
    socket.emit('sendDescription', { target, description: answer });
  }

  iceCandidateHandler(socketId, event) {
    this.socket.emit('sendCandidate', {
      target: socketId,
      candidate: event.candidate,
    });
  }

  trackHandler(stream) {
    this.dispatch({ type: 'setStream', payload: { stream } });
  }
}

export default StreamingManager;
