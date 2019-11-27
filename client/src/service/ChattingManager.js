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
  }
}

export default ChattingManager;
