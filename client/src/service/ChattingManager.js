import { useContext } from 'react';
import { DispatchContext } from '../contexts';

class ChattingManager {
  constructor(socket) {
    console.log('new ChattingManager');
    this.dispatch = useContext(DispatchContext);
    this.socket = socket;
    this.isAvailableChatting = false;
  }

  sendChattingMessage(newChatting) {
    console.log(
      'sendChattingMessage-isAvailableChatting: ',
      this.isAvailableChatting,
    );
    if (!this.isAvailableChatting) return;
    console.log('sendChattingMessage: ', newChatting);
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
    console.log('startChattingHandler', this.isAvailableChatting);
  }
}

export default ChattingManager;
