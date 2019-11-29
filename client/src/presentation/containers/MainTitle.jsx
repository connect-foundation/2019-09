import React from 'react';
import styled from 'styled-components';
import { Logo } from '../components';
import logoSrc from '../../assets/trycatch4_black2.png';

const TitleWrapper = styled.div`
  margin-top: 2rem;
  heigth: auto;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
`;

const MainTitle = () => {
  return (
    <TitleWrapper>
      <Logo logoSrc={logoSrc} />
    </TitleWrapper>
  );
};

export default MainTitle;
