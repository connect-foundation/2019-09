import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-cycle
import styled from 'styled-components';
import App from './App';
import backgroundImageSource from './assets/background.png';

const AppBackgroundWrapper = styled.div`
  height: 100%;
  background-image: url(${backgroundImageSource});
`;

ReactDOM.render(
  <AppBackgroundWrapper>
    <App />
  </AppBackgroundWrapper>,
  document.getElementById('root'),
);
