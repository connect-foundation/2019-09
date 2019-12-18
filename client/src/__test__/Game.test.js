import React, { useReducer } from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Game from '../presentation/pages/Game';
import { GlobalContext, DispatchContext } from '../contexts';
import { globalState, globalReducer } from '../store';

afterEach(cleanup);

const Test = () => {
  const [state, dispatch] = useReducer(globalReducer, globalState);
  return (
    <GlobalContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Router>
          <Game
            location={{ isPrivateRoomCreation: true }}
            match={{ params: { roomId: '' } }}
          />
        </Router>
      </DispatchContext.Provider>
    </GlobalContext.Provider>
  );
};

it('Ready 버튼이 나타난다', () => {
  const { queryByText } = render(<Test />);
  expect(queryByText('Ready')).toBeInTheDocument();
});

it('Send 버튼이 나타난다', () => {
  const { queryByText } = render(<Test />);
  expect(queryByText('Send')).toBeInTheDocument();
});
