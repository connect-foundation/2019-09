import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { STYLE_COLORS } from '../../utils';

const NicknameContent = styled.span`
  font-size: 1.6rem;
  color: ${props => {
    return props.nicknameColor || STYLE_COLORS.INFORMATION_COLOR;
  }};
`;

const Nickname = ({ children, nicknameColor }) => {
  return (
    <NicknameContent nicknameColor={nicknameColor}>{children}</NicknameContent>
  );
};

Nickname.propTypes = {
  children: PropTypes.string.isRequired,
  nicknameColor: PropTypes.string.isRequired,
};

export default Nickname;
