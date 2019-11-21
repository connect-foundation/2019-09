import io from 'socket.io-client';
import { NO_MEDIA_STREAM_MESSAGE } from './config';

class SocketClient {
  constructor(options) {
    // this.playerType;
    // this.stream;
    this.socket = io();
    this.isReady = false;
    this.rtcPeerConnections = [];
    this.mediaConstraints = options.mediaConstraints;
    this.peerConnectionConfig = options.peerConnectionConfig;
    this.streamerVideo = document.querySelector('video');
  }

  init(roomId) {
    this.registerSocketEvents();
    this.socket.emit('join', { roomId });
  }

  async setLocalStream() {
    if (!navigator.mediaDevices.getUserMedia) {
      alert(NO_MEDIA_STREAM_MESSAGE);
      return;
    }
    this.stream = await navigator.mediaDevices.getUserMedia(
      this.mediaConstraints,
    );
    this.streamerVideo.srcObject = this.stream;
  }

  registerOnTrackEvent(socketId) {
    this.rtcPeerConnections[socketId].ontrack = event => {
      [this.stream] = event.streams;
      this.streamerVideo.srcObject = this.stream;
    };
  }

  attachTrack(socketId) {
    this.rtcPeerConnections[socketId].addTrack(
      this.stream.getTracks()[0],
      this.stream,
    );
  }

  createRTCPeerConnection(socketId) {
    this.rtcPeerConnections[socketId] = new RTCPeerConnection(
      this.peerConnectionConfig,
    );
    this.rtcPeerConnections[
      socketId
    ].onicecandidate = this.iceCandidateHandler.bind(this, socketId);
  }

  iceCandidateHandler(socketId, event) {
    if (!event.candidate) return;
    this.socket.emit('sendCandidate', {
      target: socketId,
      candidate: event.candidate,
    });
  }

  async createDescription(offerOrAnswer, socketId) {
    const connection = this.rtcPeerConnections[socketId];
    const description =
      offerOrAnswer === 'offer'
        ? await connection.createOffer()
        : await connection.createAnswer();
    await connection.setLocalDescription(description);
    this.socket.emit('sendDescription', {
      target: socketId,
      description,
    });
  }

  async sendDescriptionHandler({ target, description }) {
    await this.rtcPeerConnections[target].setRemoteDescription(
      new RTCSessionDescription(description),
    );
    if (description.type === 'answer') return;
    await this.createDescription('answer', target);
  }

  async sendCandidateHandler({ target, candidate }) {
    const rtcIceCandidate = new RTCIceCandidate(candidate);
    await this.rtcPeerConnections[target].addIceCandidate(rtcIceCandidate);
  }

  async streamerHandler({ viewerSocketIds }) {
    await this.setLocalStream();
    viewerSocketIds.forEach(async viewerSocketId => {
      this.createRTCPeerConnection(viewerSocketId);
      this.attachTrack(viewerSocketId);
      await this.createDescription('offer', viewerSocketId);
    });
  }

  viewerHandler({ streamerSocketId }) {
    this.createRTCPeerConnection(streamerSocketId);
    this.registerOnTrackEvent(streamerSocketId);
  }

  emitReady(isReady) {
    this.socket.emit('ready', { isReady });
  }

  registerSocketEvents() {
    this.socket.on('playerType:streamer', this.streamerHandler.bind(this));
    this.socket.on('playerType:viewer', this.viewerHandler.bind(this));
    this.socket.on('sendDescription', this.sendDescriptionHandler.bind(this));
    this.socket.on('sendCandidate', this.sendCandidateHandler.bind(this));
  }
}

export default SocketClient;
