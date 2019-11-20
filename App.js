import React, { Component } from 'react';
import SnakeScreen from './screens/SnakeScreen';


export default class App extends Component {

  componentDidMount() {
    console.log('mounted');
  }

  render() {
    return (
      <SnakeScreen />
    );
  }
}