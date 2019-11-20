import React from 'react';
import { Route } from 'react-router-dom';
import { MainPage, Game } from './presentation/pages';

const App = () => {
  return (
    <div>
      <Route exact path="/" component={MainPage} />
      <Route path="/game" component={Game} />
    </div>
  );
};

export default App;
