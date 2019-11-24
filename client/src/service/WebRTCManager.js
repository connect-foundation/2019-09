/**
 * stream 관리
 * rtcPeerConnection 관리
 */

import { PEER_CONNECTION_CONFIG, MEDIA_CONSTRAINTS } from './config';

class WebRTCManager {
  constructor() {
    this.peerConnections = {};
    this.stream = null;
  }

  /**
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

  createConnection(key, peerConnectionConfig = PEER_CONNECTION_CONFIG) {
    this.peerConnections[key] = new RTCPeerConnection(peerConnectionConfig);
  }

  addTrack(key) {
    this.peerConnections[key].addTrack(this.stream.getTracks()[0], this.stream);
  }

  /**
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

  /**
   * trackHandler에 stream과 view와 연결하는 로직 들어가야 함
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
   * 해당 description 만든 후, socket으로 emit하는 과정 필요
   * @param {string} key
   * @param {func} description
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

  async setRemoteDescription(key, description) {
    const peerConnection = this.peerConnections[key];
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(description),
    );
  }

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
