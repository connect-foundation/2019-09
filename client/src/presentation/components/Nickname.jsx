import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styleColors from '../../constants/styleColors';

const NicknameContent = styled.span`
  font-size: 1.6rem;
  color: ${props => {
    return props.nicknameColor || styleColors.INFORMATION_COLOR;
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
