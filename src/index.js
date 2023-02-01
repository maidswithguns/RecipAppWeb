import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer.js';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk)
  ));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider
    store={store}>
    <App />
  </Provider>
);
