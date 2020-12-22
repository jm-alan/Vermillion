import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import configureStore from './store';
import csrfetch from './store/csrf';
import restoreCSRF from './store/restoreCSRF';
import * as userStateActions from './store/session';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();
  window.store = store;
  window.csrfetch = csrfetch;
  window.userStateActions = userStateActions;
}

function Root () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
