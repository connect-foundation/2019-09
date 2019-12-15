/* eslint-disable class-methods-use-this */
import { useContext } from 'react';
import { DispatchContext } from '../contexts';
import { MAX_CHAT_LENGTH } from '../config';
import EVENTS from '../constants/events';
import WELCOME_MESSAGE from '../constants/chatting';
import { INACTIVE_PLAYER_BAN_TIME } from '../constants/timer';

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
    this.socket.emit(EVENTS.SEND_CHATTING_MESSAGE, {
      message: processedChat,
    });
  }

  registerSocketEvents() {
    this.socket.on(
      EVENTS.SEND_CHATTING_MESSAGE,
      this.sendChattingMessageHandler.bind(this),
    );
    this.socket.on(EVENTS.START_CHATTING, this.startChattingHandler.bind(this));
  }

  sendChattingMessageHandler(newChatting) {
    this.dispatch({ type: 'addChatting', payload: { newChatting } });
  }

  startChattingHandler() {
    this.isAvailableChatting = true;
    this.dispatch({
      type: 'addChatting',
      payload: {
        newChatting: WELCOME_MESSAGE(INACTIVE_PLAYER_BAN_TIME),
      },
    });
  }
}

export default ChattingManager;
