import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './lib/Auth';
import {ThemeProvider} from "styled-components";

const theme = {
  black: ['#1a1a1a', '#272727'],
  yellow: ['#FFCF56', '#E4B363'],
  delete: '#C5283D',
  save: '#109648',
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
  </ThemeProvider>
  , document.getElementById('root'));

