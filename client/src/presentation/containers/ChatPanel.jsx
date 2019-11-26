import React from 'react';
import PropTypes from 'prop-types';

const ChatPanel = props => {
  return (
    <div>
      <div class="chat-window">
        <div class="chat-row">
          <span class="nickname">mosball:</span>
          <span class="message">msg</span>
        </div>
        <div class="chat-row">
          <span class="nickname">mosball:</span>
          <span class="message">msg</span>
        </div>
        <div class="chat-row">
          <span class="nickname">mosball:</span>
          <span class="message">msg</span>
        </div>
      </div>

      <div class="input-window">
        <input class="message-input" />
        <button></button>
      </div>
    </div>
  );
};

ChatPanel.propTypes = {};

export default ChatPanel;
