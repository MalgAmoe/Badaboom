import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import App from './App';
import './index.css';


ReactDOM.render(
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="/:tempo/:kx/:ky/:ksteps/:kbars/" component={App} />
    </div>
  </Router>,
  document.getElementById('root')
);
