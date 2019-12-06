import React, { useReducer } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { MainPage, Game, Ranking } from './presentation/pages';
import { GlobalContext, DispatchContext } from './contexts';
import { globalState, globalReducer } from './store';

const App = () => {
  const theme = createMuiTheme({
    typography: { fontFamily: 'Aldrich' },
  });

  const [state, dispatch] = useReducer(globalReducer, globalState);

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <Router>
            <Route exact path="/" component={MainPage} />
            <Route path="/game" component={Game} />
            <Route path="/ranking" component={Ranking} />
          </Router>
        </DispatchContext.Provider>
      </GlobalContext.Provider>
    </MuiThemeProvider>
  );
};

export default App;
