import React, { createContext, useReducer } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { MainPage, Game } from './presentation/pages';

const StateContext = createContext();
const StateReducerContext = createContext();

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
    <StateContext.Provider value={{ state }}>
      <StateReducerContext.Provider value={{ dispatch }}>
        <Router>
          <Route exact path="/" component={MainPage} />
          <Route path="/game" component={Game} />
        </Router>
      </StateReducerContext.Provider>
    </StateContext.Provider>
  );
};

export { StateContext, StateReducerContext };
export default App;
