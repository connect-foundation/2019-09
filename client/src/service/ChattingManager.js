/* eslint-disable class-methods-use-this */
import { useContext } from 'react';
import { DispatchContext } from '../contexts';
import { MAX_CHAT_LENGTH } from '../constants/inputConstraints';
import EVENTS from '../constants/events';
import WELCOME_MESSAGE from '../constants/chatting';
import {
  DEFAULT_INACTIVE_PLAYER_BAN_TIME,
  PRIVATE_ROOM_INACTIVE_PLAYER_BAN_TIME_IN_MINUTE,
} from '../constants/timer';

class ChattingManager {
  constructor(socket, isRoomPrivate) {
    this.dispatch = useContext(DispatchContext);
    this.socket = socket;
    this.isAvailableChatting = false;
    this.isRoomPrivate = isRoomPrivate;
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
        newChatting: WELCOME_MESSAGE(
          this.isRoomPrivate,
          PRIVATE_ROOM_INACTIVE_PLAYER_BAN_TIME_IN_MINUTE,
          DEFAULT_INACTIVE_PLAYER_BAN_TIME,
        ),
      },
    });
  }
}

export default ChattingManager;
