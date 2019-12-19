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

![](https://user-images.githubusercontent.com/30206880/71165121-a4e17f80-2293-11ea-9b7d-2bfd5e5b9165.png)

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
