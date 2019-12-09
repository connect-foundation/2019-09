import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Message from './Message';
import Nickname from './Nickname';

const ChattingRowWrapper = styled.li`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ChattingRow = ({ nickname, nicknameColor, message }) => {
  const newNickname = nickname ? `${nickname} : ` : 'Guest : ';
  return (
    <li>
      <ChattingRowWrapper>
        <Nickname nicknameColor={nicknameColor}>{newNickname}</Nickname>
        <Message>{message}</Message>
      </ChattingRowWrapper>
    </li>
  );
};

ChattingRow.propTypes = {
  nickname: PropTypes.string.isRequired,
  nicknameColor: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ChattingRow;
