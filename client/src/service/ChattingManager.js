import { useContext } from 'react';
import { DispatchContext } from '../contexts';

class ChattingManager {
  constructor(socket) {
    this.dispatch = useContext(DispatchContext);
    this.socket = socket;
    this.isAvailableChatting = false;
  }

  sendChattingMessage(newChatting) {
    if (!this.isAvailableChatting) return;
    this.socket.emit('sendChattingMessage', newChatting);
  }

  registerSocketEvents() {
    this.socket.on(
      'sendChattingMessage',
      this.sendChattingMessageHandler.bind(this),
    );
    this.socket.on('startChatting', this.startChattingHandler.bind(this));
  }

  sendChattingMessageHandler(newChatting) {
    this.dispatch({ type: 'addChatting', payload: { newChatting } });
  }

  startChattingHandler() {
    this.isAvailableChatting = true;
    this.dispatch({
      type: 'addChatting',
      payload: {
        newChatting: {
          nickname: '안내',
          message: '채팅방에 입장하였습니다. 🙌',
        },
      },
    });
  }
}

export default ChattingManager;
