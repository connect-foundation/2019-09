import { useContext } from 'react';
import { DispatchContext } from '../contexts';

class ChattingManager {
  constructor(socket) {
    this.dispatch = useContext(DispatchContext).dispatch;
    this.socket = socket;
  }

  sendChattingMessage(newChatting) {
    console.log('sendChattingMessage: ', newChatting);
    this.socket.emit('sendChattingMessage', newChatting);
  }

  registerSocketEvents() {
    this.socket.on('sendChattingMessage', this.sendChattingMessageHandler);
  }

  sendChattingMessageHandler(newChatting) {
    this.dispatch({ type: 'addChatting', payload: { newChatting } });
  }
}

export default ChattingManager;
