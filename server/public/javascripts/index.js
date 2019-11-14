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

const spreadUserJoined = (socketListId) => {
  if (rtcPeerConnections[socketListId]) return;
  rtcPeerConnections[socketListId] = new RTCPeerConnection(
    peerConnectionConfig,
  );

  rtcPeerConnections[socketListId].onicecandidate = () => {
    if (event.candidate === null) return;
    socket.emit('ice', socketListId, { ice: event.candidate });
  };

  rtcPeerConnections[socketListId].onaddstream = () => gotRemoteStream(event, socketListId);

  rtcPeerConnections[socketListId].addStream(localStream);
};

const userJoinHandler = async (id, count, clients) => {
  clients.forEach(spreadUserJoined);
  if (count < 2) return;
  const description = await rtcPeerConnections[id].createOffer();
  await rtcPeerConnections[id].setLocalDescription(description);
  emitSdpSignal(id, rtcPeerConnections);
};

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
