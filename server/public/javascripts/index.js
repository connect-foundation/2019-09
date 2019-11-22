const localVideo = document.querySelector('.local-video');
const rtcPeerConnections = [];
let localStream;
let socketId;

const mediaConstraints = {
  video: true,
  audio: false
};

const peerConnectionConfig = {
  'iceServers': [{
      'urls': 'stun:stun.services.mozilla.com'
    },
    {
      'urls': 'stun:stun.l.google.com:19302'
    },
  ]
};

const getUserMediaSuccess = (stream) => {
  localStream = stream;
  localVideo.srcObject = stream;
};

const getRemoteStream = (event, id) => {

  const video = document.createElement('video');
  const wrapper = document.createElement('div');
  const videos = document.querySelector('.videos');

  wrapper.classList.add('video-wrapper');
  video.setAttribute('data-socket', id);
  video.srcObject = event.stream;
  video.autoplay = true;
  video.muted = true;
  video.playsinline = true;

  wrapper.appendChild(video);
  videos.appendChild(wrapper);
}

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

const userLeftHandler = (id) => {
  const video = document.querySelector(`[data-socket="${id}"]`);
  video.parentElement.remove();
};

const spreadUserJoined = (socketListId) => {
  if (rtcPeerConnections[socketListId]) return;
  rtcPeerConnections[socketListId] = new RTCPeerConnection(
    peerConnectionConfig,
  );

  rtcPeerConnections[socketListId].onicecandidate = () => {
    if (event.candidate === null) return;
    socket.emit('ice', socketListId, {
      ice: event.candidate
    });
  };

  rtcPeerConnections[socketListId].onaddstream = () => getRemoteStream(event, socketListId);

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