<p align="middle">
  <img src="https://i.imgur.com/Np85GoX.png" width="30%">
</p>

<p align="middle">
  <!---->
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
  <!---->
  <a href="https://github.com/connect-foundation/2019-09/wiki" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <!---->
  <a href="https://github.com/connect-foundation/2019-09/issues">
    <img alt="issue tracking" src="https://img.shields.io/github/issues/connect-foundation/2019-09"/>
  </a>
  <!---->
  <a href="https://github.com/connect-foundation/2019-09/pulls">
    <img alt="pr tracking" src="https://img.shields.io/github/issues-pr/connect-foundation/2019-09"/>
  </a>
  <!---->
  <a href="https://github.com/connect-foundation/2019-02/blob/master/LICENSE.md" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <!---->
</p>

<br>

## 🏡 Links

- **Demo** : [https://trycatch.growd.me](https://trycatch.growd.me)
- **Documentation** : [https://github.com/connect-foundation/2019-09/wiki](https://github.com/connect-foundation/2019-09/wiki)

<br>

## 🕺 Introduction

- 🙆 💁 🙋 Try Catch는 레크레이션 게임 &#34;몸으로 말해요&#34;를 어디서나 즐길 수 있도록 웹으로 구현한 서비스입니다.

- 네트워크 환경의 변화, 사용자의 돌발 행동에도 게임이 원활하게 진행되는 것을 목표로 합니다.

- 원활한 영상 전송을, 버그 없는 게임을, 스마트폰으로도 어디서나 즐기는, 즐거운 경험을 제공하는 것을 목표로 합니다.

<br>

## 💡 Technologies Used

![](https://user-images.githubusercontent.com/30206880/71165752-c2fbaf80-2294-11ea-9025-63f9be777c5d.png)

<br>

## :hammer_and_wrench: Process

### Sprint 1

- 어떻게 하면 `도전적인 주제`를 선정할 것인가?
  - <b>도전적인 기술</b> : 우리가 아직 `경험해보지 못한 기술`
    - <b>영상</b> : 멤버십 기간에 한번도 경험해보지 못한, 도전적인 주제
    - <b>게임</b> : 마찬가지로 경험해보지 못한 새로운 주제
  - <b>결론</b> : `영상 + 게임` 두 주제를 결합해서 지금까지 경험해보지 못한 기술에 `도전`해보자.



### Sprint 2

- WebRTC
  - 이 기술이 `가능한 기술`인가? 또한 이 `기술의 원리`는 무엇인가?
    - `Relaying`, `Connection reversal`, `UDP hole punching` 과 같은 `P2P 구현 기술`에 대한 공부
    - P2P 연결은 이미 존재하는 기술이고, 이 기술을 적용하면 충분히 실현이 가능하리라는 확신
    - `WebRTC`는 존재하는 기술을 적용하지만 `브라우저`에서 실현이 가능하다는 점에서 획기적인 기술
  - STUN 서버 : `사용자의 IP`를 알려주는 서버
  - TURN 서버 : P2P 연결이 실패할 경우, `우회하여 연결`하는 서버
  - 이해를 기반으로 `N:N 다자간 연결` 구현
- 환경 세팅
  - docker : `버전 관리`와 OS로부터 `독립적인 환경` 제공
  - HTTPS : 브라우저로부터 `카메라 권한`을 얻기 위한 HTTPS 인증



### Sprint 3

- `1:N`다자간 통신
  - 기존 WebRTC에서는 클라이언트 전원의 `N:N` 연결
  - `불필요한 연결`이 발생하는 문제
  - `Streamer(영상 송출자)`와 `Viewer(영상 수신자)` 간의 `1:N` 연결 고안 및 변경
- 게임 룸 구현
  - socket.io 활용
    - socket.io API에서 제공하는 room 활용
  - 게임 이벤트 처리에 대한 로직 구현
  - 한 세트(스트리머 전환 x) 게임 진행



### Sprint 4

- 프론트엔드 WebRTC 리팩토링
  - 기존의 코드 : <b>socket의 기능이 WebRTC에 종속적인 구조</b>
    - 채팅이나 게임 이벤트를 확장할 수 없는 구조
  - `ClientManager`, `ChattingManager`, `StreamingManager`로 클라이언트의 매니저 분리
    - 각각의 매니저가 소켓 객체를 공유하지만 담당하는 부분 분리
    - 기능 확장 용이 및 책임 분산 가능



### Sprint 5

- 게임 진행 시스템 구성
  - 게임 룸에 waiting, playing 등의 `status 설정`
  - 1라운드(모든 플레이어가 돌아가면서 게임) 진행 구성
    - 기존에는 1명의 플레이어만 영상 송출이 가능했었음



### Sprint 6

- 게임 진행 오류 수정
  - `Sprint 5`에 진행한 버그데이에 발생한 문제 해결
    - 카메라 권한 거부에 대한 예외 처리
    - 게임 중간에 플레이어가 나갈 경우에 대한 예외 처리
  - 팀원 전원의 테스팅을 통해 발생하는 오류 제거



### Sprint 7

- 리팩토링
  - 클라이언트와 서버에 존재하는 `Magic Number` 제거

<br>

## 🚌 Data Transfer

### [**WebRTC**](https://webrtc.org/)

#### Peer To Peer로 전송하는 영상 스트리밍

- 서버를 통한 스트리밍 비용을 최소화하기 위해 클라이언트 간의 연결을 활용하는 `WebRTC` 기술을 선택하였습니다.

### [**Socket.io**](socket.io)

#### Socket통신을 통한 게임 시스템 구현

- `WebRTC`의 메타데이터 전송과 게임에서 실시간으로 발생하는 이벤트를 처리하기 위해 `socket.io`를 사용했습니다.

- [**게임 이벤트 흐름**](https://github.com/connect-foundation/2019-09/wiki/%EA%B2%8C%EC%9E%84-%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4-%EC%9D%B4%EB%B2%A4%ED%8A%B8)

<br>

## 🌊 Data flow

![](https://user-images.githubusercontent.com/30206880/71165116-a14df880-2293-11ea-8e90-f3f23e1c128f.png)

<br>

## 🚴 How To Run

> [docker](https://www.docker.com/)와 [docker-compose](https://docs.docker.com/compose/)의 설치를 필요로 합니다.

```sh
$ docker-compose up -d
```

<br>

## 🎬 Demo video

#### 4주차 데모

<img src="https://i.imgur.com/OpWe8nt.gif" width="40%"/>

#### 2주차 데모

<img src="https://i.imgur.com/EwBnzHG.gif" width="40%"/>

<br>

## ✍️ Author

**Team Try Catch**

- **권기웅** [(mosball)](https://github.com/mosball)
- **나영균** [(younguna)](https://github.com/younguna)
- **장기원** [(OriginJang)](https://github.com/OriginJang)
- **조정현** [(JeonghyunJo)](https://github.com/JeonghyeonJo)

<br>

## 🔥 Issues

- [link](https://github.com/connect-foundation/2019-09/issues)

<br>

## 📜 License

Copyright © Try Catch
[MIT License](https://opensource.org/licenses/MIT)

<br>

## :octocat: Show your support

Give a ⭐️ if this project helped you!

---

#### Special Thanks to [Boostcamp](http://boostcamp.connect.or.kr/) and [Connect Foundation](https://connect.or.kr/)