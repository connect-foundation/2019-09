const localVideo = document.querySelector('.local-video');
let localStream;

const mediaConstraints = { video: true, audio: false };

const getUserMediaSuccess = (stream) => {
  localStream = stream;
  localVideo.srcObject = stream;
};

const runWebRTC = async () => {
  if (!navigator.mediaDevices.getUserMedia) {
    alert('Your browser does not support getUserMedia API');
  } else {
    const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    getUserMediaSuccess(stream);
  }
};

runWebRTC();
