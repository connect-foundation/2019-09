import React from 'react';
import styled from 'styled-components';
import { MainTitle, Menu, HowToPlay } from '../containers';

const PageWrapper = styled.div`
  width: 100%;
  heigth: 100%;
  display: flex;
  justify-content: center;
`;

const PageContents = styled.div`
  width: 20rem;
  height: auto;
`;

const MainPage = () => {
  return (
    <PageWrapper>
      <PageContents>
        <MainTitle />
        <Menu />
        <HowToPlay />
      </PageContents>
    </PageWrapper>
  );
};

export default MainPage;
