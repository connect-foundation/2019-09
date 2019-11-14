const localVideo = document.querySelector('.local-video');
const rtcPeerConnections = [];
let localStream;
let socketId;

const mediaConstraints = { video: true, audio: false };

const getUserMediaSuccess = stream => {
  localStream = stream;
  localVideo.srcObject = stream;
};

const getSdpFromServer = () => {};
const getIceFromServer = () => {};
const userLeftHandler = () => {};
const userJoinHandler = () => {};
const initSocketId = () => {};

const runWebRTC = async () => {
  if (!navigator.mediaDevices.getUserMedia) {
    alert('Your browser does not support getUserMedia API');
  } else {
    const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    getUserMediaSuccess(stream);
  }

  socket = io();

  socket.on('sdp', getSdpFromServer);
  socket.on('ice', getIceFromServer);
  socket.on('user-left', userLeftHandler);
  socket.on('user-joined', userJoinHandler);
  socket.on('connect', initSocketId);
};

runWebRTC();
