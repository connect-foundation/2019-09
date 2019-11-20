import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LargeButtonContent = styled.button`
  width: 15rem;
  height: 2rem;
  border: none;
  outline: none;
  border-style: solid;
  border-radius: 5px;
  border-width: 1px;
  margin-top: 0.3rem;
  background: #5a96ff;
  color: #ffffff;
  font-weight: 600;
`;
const LargeButton = ({ name, onClick }) => {
  return <LargeButtonContent onClick={onClick}>{name}</LargeButtonContent>;
};

LargeButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LargeButton;
