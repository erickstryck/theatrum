import React from 'react';
import { render } from 'react-dom';
import Routes from './Routes';
import '../public/css/app.css';

render(
  <Routes />,
  document.getElementById('content')
);

if (module.hot) {
  module.hot.accept('./Routes', () => {
    const NextApp = require('./Routes').default;
    render(
      <NextApp />,
      document.getElementById('content')
    );
  });
}