import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './App';
import configureStore from './store/store';
import './styles/main.scss';
import '../node_modules/toastr/build/toastr.css';
import registerServiceWorker from './registerServiceWorker';


const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('app')
);

registerServiceWorker();
