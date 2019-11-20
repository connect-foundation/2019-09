import config from './config.js';

class SocketClient {
  constructor(options) {
    this.playerType;
    this.localStream;
    this.socket = io();
    this.isReady = false;
    this.rtcPeerConnections = [];
    this.mediaConstraints = options.mediaConstraints;
    this.peerConnectionConfig = options.peerConnectionConfig;
    this.streamerVideo = document.querySelector('.streamer-video');
    this.init();
  }

  init() {
    this.registerRoomJoinEvent();
    this.registerReadyEvent();
    this.registerSocketEvents();
  }

  streamerHandler({ viewerSocketIds }) {
    console.log(viewerSocketIds);
  }

  viewerHandler({ streamerSocketId }) {
    console.log(streamerSocketId);
  }

  registerSocketEvents() {
    this.socket.on('playerType:streamer', this.streamerHandler);
    this.socket.on('playerType:viewer', this.viewerHandler);
  }

  registerRoomJoinEvent() {
    const roomNumberInput = document.querySelector('.room-number-input');
    const streamingContainer = document.querySelector('.streaming-container');
    const switchStreamerButton = document.querySelector(
      '.switch-streamer-button',
    );

    roomNumberInput.addEventListener('keyup', e => {
      if (e.keyCode !== config.ENTER_KEY_CODE) {
        return;
      }
      streamingContainer.classList.remove('hide');
      roomNumberInput.classList.add('hide');
      const roomNumber = roomNumberInput.value;
      this.socket.emit('join', { roomNumber });
    });
  }

  registerReadyEvent() {
    const readyButton = document.querySelector('.ready-button');

    readyButton.addEventListener('click', () => {
      this.isReady = !this.isReady;
      readyButton.innerHTML = this.isReady ? 'Cancel' : 'Ready';
      this.socket.emit('ready', { isReady: this.isReady });
    });
  }
}

new SocketClient({
  mediaConstraints: config.mediaConstraints,
  peerConnectionConfig: config.peerConnectionConfig,
});
