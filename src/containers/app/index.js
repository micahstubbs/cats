import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import About from '../about';
import Cats from '../cats';

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Cats} />
    </main>
  </div>
);

export default App;
