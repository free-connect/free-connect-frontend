import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/utility/scrollToTop.component';

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <ScrollToTop />
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

