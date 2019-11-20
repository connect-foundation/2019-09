import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LargeButton, TextInput } from '../components';

const MenuWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 0rem 0.1rem 0.1rem 0rem grey;
  height: 10rem;
  justify-content: space-evenly;
`;

const Menu = () => {
  return (
    <MenuWrapper>
      <TextInput placeholder="NAME" id="user-name" />
      <LargeButton text="PLAY" onClick={() => {}} />
      <LargeButton text="RANK" onClick={() => {}} />
    </MenuWrapper>
  );
};

export default Menu;
