import { useContext } from 'react';
import { DispatchContext } from '../contexts';
import WebRTCManager from './WebRTCManager';

class StreamingManager {
  constructor(socket) {
    this.dispatch = useContext(DispatchContext).dispatch;
    this.socket = socket;
    this.webRTCManager = new WebRTCManager();
  }

  async assignStreamerHandler(socketIds) {
    const { webRTCManager, iceCandidateHandler, socket } = this;

    webRTCManager.closeAllConnections();
    await webRTCManager.createStream();

    webRTCManager.createConnections(socketIds);
    webRTCManager.registerIceCandidates(
      socketIds,
      iceCandidateHandler.bind(this),
    );
    webRTCManager.addTracks(socketIds);
    const descriptions = await webRTCManager.createOfferDescriptions(socketIds);
    await webRTCManager.setLocalDescriptions(socketIds, descriptions);
    socketIds.forEach((socketId, index) => {
      socket.emit('sendDescription', {
        target: socketId,
        description: descriptions[index],
      });
    });
  }

  iceCandidateHandler(socketId, event) {
    this.socket.emit('sendCandidate', {
      target: socketId,
      candidate: event.candidate,
    });
  }
}

export default StreamingManager;
