import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store';
import Reddit from './Reddit';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Reddit />
      </Provider>
    );
  }
}
