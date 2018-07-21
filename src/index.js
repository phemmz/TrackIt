import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'babel-polyfill';

import { App } from './App';
import configureStore from './store/store';
import './styles/main.scss';


const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('app')
);
