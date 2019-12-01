import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MessageContent = styled.span`
  font-size: 1.4rem;
  word-wrap: break-word;
`;

const Message = ({ children }) => {
  return <MessageContent>{children}</MessageContent>;
};

Message.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Message;
