import React from 'react';
import styled from 'styled-components';
import { Logo } from '../components';
import logoSrc from '../../assets/main-logo-large.png';

const TitleWrapper = styled.div`
  heigth: 100%;
  width: 100%;
`;

const MainTitle = () => {
  return (
    <TitleWrapper>
      <Logo logoSrc={logoSrc} />
    </TitleWrapper>
  );
};

export default MainTitle;
