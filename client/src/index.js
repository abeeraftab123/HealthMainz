import React from 'react';
import ReactDom from 'react-dom';
import { reducers } from './reducers/index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from "./App"

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDom.render(
    <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('root')
);