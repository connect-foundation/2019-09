import { useContext } from 'react';
import { DispatchContext } from '../contexts';
import WebRTCManager from './WebRTCManager';

class StreamingManager {
  constructor(socket) {
    this.dispatch = useContext(DispatchContext).dispatch;
    this.socket = socket;
    this.webRTCManager = new WebRTCManager();
  }

  registerSocketEvents() {
    this.socket.on('assignStreamer', this.assignStreamerHandler.bind(this));
    this.socket.on('assignViewer', this.assignViewerHandler.bind(this));
    this.socket.on('sendCandidate', this.sendCandidateHandler.bind(this));
    this.socket.on('sendDescription', this.sendDescriptionHandler.bind(this));
  }

  async assignStreamerHandler({ socketIds }) {
    const { webRTCManager, iceCandidateHandler, socket } = this;

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
      socket.emit('sendDescription', {
        target: socketId,
        description: offers[index],
      });
    });
  }

  async assignViewerHandler({ socketId }) {
    const { webRTCManager, iceCandidateHandler, trackHandler } = this;
    webRTCManager.createConnection(socketId);
    webRTCManager.registerIceCandidate(
      socketId,
      iceCandidateHandler.bind(this),
    );
    webRTCManager.registerTrack(socketId, trackHandler.bind(this));
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
