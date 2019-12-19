import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Message from './Message';
import Nickname from './Nickname';
import styleColors from '../../constants/styleColors';
import { DEFAULT_NICKNAME } from '../../constants/chatting';

const ChattingRowWrapper = styled.li`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${styleColors.BASE_WHITE_COLOR_TRANSLUCENT};
  padding: 0.4rem;
  border-radius: 0.3rem;
`;

const ChattingRow = ({ nickname, nicknameColor, message }) => {
  const newNickname = nickname ? `${nickname} : ` : `${DEFAULT_NICKNAME} : `;
  return (
    <ChattingRowWrapper>
      <Nickname nicknameColor={nicknameColor}>{newNickname}</Nickname>
      <Message>{message}</Message>
    </ChattingRowWrapper>
  );
};

ChattingRow.defaultProps = {
  nickname: '',
  nicknameColor: '',
};

ChattingRow.propTypes = {
  nickname: PropTypes.string,
  nicknameColor: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default ChattingRow;
