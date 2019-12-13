import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { STYLE_COLORS } from '../../utils';

const MessageContent = styled.span`
  font-size: 1.4rem;
  word-wrap: break-word;
  color: ${STYLE_COLORS.BASE_BLACK_COLOR};
  line-height: 1.4;
`;

const Message = ({ children }) => {
  return <MessageContent>{children}</MessageContent>;
};

Message.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Message;
