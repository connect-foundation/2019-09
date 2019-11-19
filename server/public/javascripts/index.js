const socket = io();

const mediaConstraints = {
  video: true,
  audio: false,
};

const peerConnectionConfig = {
  iceServers: [{
      urls: 'stun:stun.services.mozilla.com',
    },
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};

const roomNumberInput = document.querySelector('.room-number-input');
const streamingContainer = document.querySelector('.streaming-container');
const streamerVideo = document.querySelector('.streamer-video');
const switchStreamerButton = document.querySelector('.switch-streamer-button');

roomNumberInput.addEventListener('keyup', (e) => {
  if (e.keyCode == 13) {
    streamingContainer.classList.remove('hide');
    roomNumberInput.classList.add('hide');
    const roomNumber = roomNumberInput.value;
    socket.emit('join', {
      roomNumber
    });
  }
});