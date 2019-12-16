/* eslint-disable class-methods-use-this */
import { useContext } from 'react';
import { DispatchContext } from '../contexts';
import { MAX_CHAT_LENGTH } from '../config';
import EVENTS from '../constants/events';
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
        newChatting: {
          nickname: '안내',
          message: `채팅방에 입장하였습니다. ${
            this.isRoomPrivate
              ? `${PRIVATE_ROOM_INACTIVE_PLAYER_BAN_TIME_IN_MINUTE}분`
              : `${DEFAULT_INACTIVE_PLAYER_BAN_TIME}초`
          } 안에 READY버튼을 눌러주세요.🙌`,
        },
      },
    });
  }
}

export default ChattingManager;
