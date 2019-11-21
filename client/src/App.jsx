import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { MainPage, Game } from './presentation/pages';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={MainPage} />
      <Route path="/game" component={Game} />
    </Router>
  );
};

export default App;
