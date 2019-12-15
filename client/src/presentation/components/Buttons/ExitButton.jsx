import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const ExitButton = ({ onClick, imageSource }) => {
  return (
    <StyledExitButton type="button" onClick={onClick}>
      <img alt="exit" src={imageSource} />
    </StyledExitButton>
  );
};

ExitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  imageSource: PropTypes.string.isRequired,
};

export default ExitButton;
