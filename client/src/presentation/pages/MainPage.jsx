import React from 'react';
import styled from 'styled-components';
import { MainTitle } from '../containers';
import { LargeButton, TextInput } from '../components';

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
        <TextInput placeholder="NAME" id="user-name" />
        <LargeButton name="PLAY" onClick={() => {}} />
        <LargeButton name="RANK" onClick={() => {}} />
      </PageContents>
    </PageWrapper>
  );
};

export default MainPage;
