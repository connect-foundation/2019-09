const EVENTS = {
  // GameManager
  MATCH: 'match',
  SEND_PLAYERS: 'sendPlayers',
  SEND_NEW_PLAYER: 'sendNewPlayer',
  SEND_READY: 'sendReady',
  START_GAME: 'startGame',
  PREPARE_SET: 'prepareSet',
  SEND_CURRENT_SECONDS: 'sendCurrentSeconds',
  START_SET: 'startSet',
  CORRECT_ANSWER: 'correctAnswer',
  END_SET: 'endSet',
  DISCONNECT: 'disconnect',
  SELECT_QUIZ: 'selectQuiz',
  // StreamerManager
  ASSIGN_STREAMER: 'assignStreamer',
  ASSING_VIEWER: 'assignViewer',
  SEND_ICE_CANDIDATE: 'sendIceCandidate',
  SEND_DESCRIPTION: 'sendDescription',
  CONNECT_PEER: 'connectPeer',
  // ClientManager
  SEND_SOCKET_ID: 'sendSocketId',
  SEND_LEFT_PLAYER: 'sendLeftPlayer',
  END_GAME: 'endGame',
  ASK_SOCKET_ID: 'askSocketId',
  // ChattingManager
  SEND_CHATTING_MESSAGE: 'sendChattingMessage',
  START_CHATTING: 'startChatting',
};

export default EVENTS;
