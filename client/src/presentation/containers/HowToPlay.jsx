import React from 'react';
import styled from 'styled-components';
import { Title, Description } from '../components';
import { MainHowToPlayTitle, MainHowToPlayDescription } from '../../config';

const HowToPlayWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0rem 0.1rem 0.1rem 0rem grey;
  height: 10rem;
  overflow-y: auto;
  padding: 0 0.5rem;
`;

const HowToPlay = () => {
  return (
    <HowToPlayWrapper>
      <Title content={MainHowToPlayTitle} />
      <Description content={MainHowToPlayDescription} />
    </HowToPlayWrapper>
  );
};

export default HowToPlay;
