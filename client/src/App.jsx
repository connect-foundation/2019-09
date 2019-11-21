import React, { useReducer } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { MainPage, Game } from './presentation/pages';
import { GlobalContext, DispatchContext } from './contexts';

const App = () => {
  const initialState = {
    roomId: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeRoomId':
        return { ...state, roomId: action.payload.roomId };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state }}>
      <DispatchContext.Provider value={{ dispatch }}>
        <Router>
          <Route exact path="/" component={MainPage} />
          <Route path="/game" component={Game} />
        </Router>
      </DispatchContext.Provider>
    </GlobalContext.Provider>
  );
};

export default App;
