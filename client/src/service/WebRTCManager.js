import { PEER_CONNECTION_CONFIG, MEDIA_CONSTRAINTS } from './config';

/**
 * stream 관리
 * rtcPeerConnection 관리
 */
class WebRTCManager {
  constructor() {
    this.peerConnections = {};
    this.stream = null;
  }

  /**
   * 브라우저의 카메라를 가져와 stream에 등록.
   * 스트리머일 경우, 반드시 필요한 함수
   *
   * 스트림의 생성만 관리하기 때문에 바깥에서
   * 예외처리, 그리고 view와의 연결을
   * 책임져야함
   */
  async createStream(mediaConstraints = MEDIA_CONSTRAINTS) {
    this.stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
  }

  createConnections(keys) {
    keys.forEach(key => {
      this.createConnection(key);
    });
  }

  /**
   * key값을 기준으로 rtcPeerConnection 생성.
   * peerConnections에 값을 저장.
   * 이후에는 해당 커넥션에 registerIceCandidate를 반드시
   * 설정해야 함.
   *
   * @param {string} key
   */
  createConnection(key, peerConnectionConfig = PEER_CONNECTION_CONFIG) {
    this.peerConnections[key] = new RTCPeerConnection(peerConnectionConfig);
  }

  /**
   * 송신을 하기 위한 track 생성.
   * stream을 등록해야하기 때문에 createStream을 미리 해야함.
   *
   * @param {string} key
   */
  addTrack(key) {
    this.peerConnections[key].addTrack(this.stream.getTracks()[0], this.stream);
  }

  addTracks(keys) {
    keys.forEach(key => {
      this.addTrack(key);
    });
  }

  /**
   * onicecandidate 발생할 때, 즉 자신이
   * ice candidate를 찾을 경우, 이를 공유하는 이벤트 등록.
   * rtcPeerConnection을 만들 때에는 반드시 이 함수가 들어가야 함.
   *
   * iceCandidateHandler에 socket이 대상 목표에게
   * emit하는 로직 들어가야 함
   *
   * @param {string} key
   * @param {func} iceCandidateHandler
   */
  registerIceCandidate(key, iceCandidateHandler) {
    this.peerConnections[key].onicecandidate = event => {
      iceCandidateHandler(key, event);
    };
  }

  registerIceCandidates(keys, iceCandidateHandler) {
    keys.forEach(key => {
      this.registerIceCandidate(key, iceCandidateHandler);
    });
  }

  /**
   * viewer일 경우, 들어오는 stream을 자신의 stream과 연결하는 함수.
   * viewer일 경우, 이 함수가 반드시 들어가야 함.
   * trackHandler에 stream과 view를 연결하는 로직 들어가야 함
   *
   * @param {string} key
   * @param {func} trackHandler
   */
  registerTrack(key, trackHandler) {
    this.peerConnections[key].ontrack = event => {
      [this.stream] = event.streams;
      trackHandler(this.stream);
    };
  }

  /**
   * streamer일 경우, 이 함수를 반드시 사용해서
   * 송신자임을 밝히고, 비디오 관련 정보를 전송한다.
   * 이 함수를 한 이후, setLocalDescription으로
   * 해당 connection에 description을 등록해야 한다.
   *
   * @param {string} key
   */
  async createOfferDescription(key) {
    const peerConnection = this.peerConnections[key];
    const description = await peerConnection.createOffer();
    return description;
  }

  async createOfferDescriptions(keys) {
    const descriptions = await Promise.all(
      keys.map(key => {
        return this.createOfferDescription(key);
      }),
    );
    return descriptions;
  }

  /**
   * offer을 받을 경우, 이에 대한 응답을 보낸다.
   * 즉, 스트리머는 이 함수를 사용할 필요가 없다.
   *
   * @param {string} key
   */
  async createAnswerDescription(key) {
    const peerConnection = this.peerConnections[key];
    const description = await peerConnection.createAnswer();
    return description;
  }

  async createAnswerDescriptions(keys) {
    const descriptions = await Promise.all(
      keys.map(key => {
        return this.createAnswerDescription(key);
      }),
    );
    return descriptions;
  }

  /**
   * peerConnection의 setLocalDescription과 직접 연결.
   * 해당 description 만든 후, socket으로 emit하는 과정 필요.
   *
   * @param {string} key
   * @param {description} description
   */
  async setLocalDescription(key, description) {
    const peerConnection = this.peerConnections[key];
    await peerConnection.setLocalDescription(description);
  }

  async setLocalDescriptions(keys, descriptions) {
    await Promise.all(
      keys.forEach((key, i) => {
        this.setLocalDescription(key, descriptions[i]);
      }),
    );
  }

  /**
   * 상대방의 description을 받으면, 이를 자신의 connection에
   * 등록시키는 함수. 이 함수를 실행하고, 자신이 answer을 받았으면
   * 재전송 할 필요가 없지만, offer을 받았다면
   * socket으로 answer을 전송해야 한다.
   *
   * @param {string} key
   * @param {description} description
   */
  async setRemoteDescription(key, description) {
    const peerConnection = this.peerConnections[key];
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(description),
    );
  }

  /**
   * socket을 통해 전송받은 ice candidate를 connection에 등록한다.
   *
   * @param {string} key
   * @param {candidate} candidate
   */
  async addIceCandidate(key, candidate) {
    const rtcIceCandidate = new RTCIceCandidate(candidate);
    const peerConnection = this.peerConnections[key];
    await peerConnection.addIceCandidate(rtcIceCandidate);
  }

  /**
   * 아직 사용하지 않는 함수
   */
  closeAllConnections() {
    const keys = Object.keys(this.peerConnections);

    keys.forEach(key => {
      this.peerConnections[key].close();
    });
    this.peerConnections = {};
  }

  closeConnection(key) {
    this.peerConnections[key].close();

    delete this.peerConnections[key];
  }
}

export default WebRTCManager;
