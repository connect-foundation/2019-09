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
    this.registerRoomJoinEvent();
    this.registerReadyEvent();
  }

  registerRoomJoinEvent() {
    const roomNumberInput = document.querySelector('.room-number-input');
    const streamingContainer = document.querySelector('.streaming-container');
    const switchStreamerButton = document.querySelector(
      '.switch-streamer-button',
    );
    const ENTER_KEY_CODE = 13;

    roomNumberInput.addEventListener('keyup', e => {
      if (e.keyCode === ENTER_KEY_CODE) {
        streamingContainer.classList.remove('hide');
        roomNumberInput.classList.add('hide');
        const roomNumber = roomNumberInput.value;
        this.socket.emit('join', { roomNumber });
      }
    });
  }

  registerReadyEvent() {
    const readyButton = document.querySelector('.ready-button');

    readyButton.addEventListener('click', () => {
      this.socket.emit('ready', { isReady: true });
    });
  }
}

const mediaConstraints = {
  video: true,
  audio: false,
};

const peerConnectionConfig = {
  iceServers: [
    {
      urls: 'stun:stun.services.mozilla.com',
    },
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};

new SocketClient({
  mediaConstraints,
  peerConnectionConfig,
});
