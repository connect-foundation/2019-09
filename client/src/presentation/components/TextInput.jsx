import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputWrapper = styled.div`
  width: 15rem;
  height: 1.9rem;
  border-style: solid;
  border-radius: 5px;
  border-width: 1px;
  display: flex;
  justify-content: center;
  background: #f6f6f6;
`;
const InputContent = styled.input`
  width: 90%;
  height: 90%;
  border: none;
  margin: auto;
  outline: none;
  background: transparent;
`;
const TextInput = ({ placeholder, id }) => {
  return (
    <InputWrapper>
      <InputContent placeholder={placeholder} id={id} />
    </InputWrapper>
  );
};

TextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default TextInput;
