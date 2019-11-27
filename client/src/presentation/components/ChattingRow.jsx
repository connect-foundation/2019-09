import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Message from './Message';
import Nickname from './Nickname';

const ChattingRow = ({ nickname, message }) => {
  const newNickname = `${nickname} : `;
  return (
    <Box>
      <Nickname>{newNickname}</Nickname>
      <Message>{message}</Message>
    </Box>
  );
};

ChattingRow.propTypes = {
  nickname: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ChattingRow;
