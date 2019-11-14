const localVideo = document.querySelector('.local-video');
const rtcPeerConnections = [];
let localStream;
let socketId;

const mediaConstraints = { video: true, audio: false };

const getUserMediaSuccess = (stream) => {
  localStream = stream;
  localVideo.srcObject = stream;
};

const emitSdpSignal = (fromId, connections) => {
  socket.emit('sdp', fromId, {
    sdp: connections[fromId].localDescription,
  });
};

const getSdpFromServer = async (fromId, message) => {
  if (fromId !== socketId) {
    await rtcPeerConnections[fromId].setRemoteDescription(
      new RTCSessionDescription(message.sdp),
    );
    if (message.sdp.type !== 'offer') return;
    const description = await rtcPeerConnections[fromId].createAnswer();
    await rtcPeerConnections[fromId].setLocalDescription(description);
    emitSdpSignal(fromId, rtcPeerConnections);
  }
};

const getIceFromServer = async (fromId, message) => {
  if (fromId !== socketId) {
    rtcPeerConnections[fromId]
      .addIceCandidate(new RTCIceCandidate(message.ice))
      .catch(console.log);
  }
};

const userLeftHandler = () => {};
const userJoinHandler = () => {};
const initSocketId = () => {
  socketId = socket.id;
};

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
