import React from 'react';
import { render } from "react-snapshot";
import { BrowserRouter as Router } from "react-router-dom";
import App from './components/App';

render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);