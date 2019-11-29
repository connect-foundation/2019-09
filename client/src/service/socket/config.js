const MEDIA_CONSTRAINTS = {
  video: true,
  audio: false,
};

const PEER_CONNECTION_CONFIG = {
  iceServers: [
    { urls: 'stun:stun.services.mozilla.com' },
    { urls: 'stun:stun.l.google.com:19302' },
    {
      url: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com',
    },
  ],
};

const NO_MEDIA_STREAM_MESSAGE =
  'Your browser does not support getUserMedia API';

export { MEDIA_CONSTRAINTS, PEER_CONNECTION_CONFIG, NO_MEDIA_STREAM_MESSAGE };
