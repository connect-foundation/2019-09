import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Message from './Message';
import Nickname from './Nickname';

const ChattingRow = ({ nickname, nicknameColor, message }) => {
  const newNickname = `${nickname} : `;
  return (
    <Box>
      <Nickname nicknameColor={nicknameColor}>{newNickname}</Nickname>
      <Message>{message}</Message>
    </Box>
  );
};

ChattingRow.propTypes = {
  nickname: PropTypes.string.isRequired,
  nicknameColor: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ChattingRow;
