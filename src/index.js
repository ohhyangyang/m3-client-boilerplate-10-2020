import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.css';

import { AuthProvider } from './context/auth-context';

ReactDOM.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
, document.getElementById('root'));
