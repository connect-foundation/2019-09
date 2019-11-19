export default {
  mediaConstraints: {
    video: true,
    audio: false,
  },

  peerConnectionConfig: {
    iceServers: [
      { urls: 'stun:stun.services.mozilla.com' },
      { urls: 'stun:stun.l.google.com:19302' },
    ],
  },

  ENTER_KEY_CODE: 13,
};
