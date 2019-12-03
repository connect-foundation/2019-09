import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import exitImageSource from '../../../assets/exit.png';

const StyledExitButton = styled.button`
  width: 3rem;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  img {
    width: 100%;
  }
`;

const ExitButton = ({ onClick }) => {
  return (
    <StyledExitButton type="button" onClick={onClick}>
      <img alt="exit" src={exitImageSource} />
    </StyledExitButton>
  );
};

ExitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ExitButton;
