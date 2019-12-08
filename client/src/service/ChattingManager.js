/* eslint-disable class-methods-use-this */
import { useContext } from 'react';
import { DispatchContext } from '../contexts';
import { MAX_CHAT_LENGTH } from '../config';

class ChattingManager {
  constructor(socket) {
    this.dispatch = useContext(DispatchContext);
    this.socket = socket;
    this.isAvailableChatting = false;
  }

  trimChattingMessage(chattingMessage) {
    return { ...chattingMessage, message: chattingMessage.message.trim() };
  }

  sliceChattingMessage(chattingMessage) {
    return {
      ...chattingMessage,
      message: chattingMessage.message.slice(0, MAX_CHAT_LENGTH),
    };
  }

  sendChattingMessage(newChatting) {
    if (!this.isAvailableChatting) return;
    const trimmedChat = this.trimChattingMessage(newChatting);
    if (!trimmedChat) return;
    const slicedChat = this.sliceChattingMessage(trimmedChat);
    this.socket.emit('sendChattingMessage', slicedChat);
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
