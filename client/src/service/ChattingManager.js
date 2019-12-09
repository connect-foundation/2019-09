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

  sliceChattingMessage(chat) {
    return chat.slice(0, MAX_CHAT_LENGTH);
  }

  processChatWithSystemRule(chat) {
    const trimmedChat = chat.trim();
    if (!trimmedChat) return '';
    return this.sliceChattingMessage(trimmedChat);
  }

  sendChattingMessage(newChat) {
    if (!this.isAvailableChatting) return;
    const processedChat = this.processChatWithSystemRule(newChat.message);
    if (!processedChat) return;
    this.socket.emit('sendChattingMessage', {
      message: processedChat,
    });
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
