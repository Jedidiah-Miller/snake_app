import React, { Component } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Alert, Button } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Head } from '../components/Snake/Head';
import { Tail } from '../components/Snake/Tail';
import { Food } from '../components/Snake/Food';
import { GameLoop } from '../components/GameSystem/Systems';
import { ControlButtons } from '../components/Controls/ControlButtons';
import Constants from '../styles/constants';
import { ENGINE_DISPATCH_TYPES } from '../components/Controls/EngineDispatchTypes';


export default class SnakeScreen extends Component {

  constructor(props) {
    super(props);
    this.boardSize = Constants.MAX_WIDTH;
    this.engine = null;
    this.state = {
      isRunning: true,
      score: 0
    }
  }

  randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  onEvent = (e) => {
    if (e.type === ENGINE_DISPATCH_TYPES.gameOver) {
      this.setState({
        isRunning: false
      });
      Alert.alert('Game Over');
    }
  }

  gameEngineEntities = () => {
    return {
      head: { position: [0,  0], xspeed: 1, yspeed: 0, nextMove: 10, updateFrequency: 8, size: Constants.GRID_SIZE, renderer: <Head /> },
      food: { position: [this.getGridPosition(), this.getGridPosition()], size: Constants.GRID_SIZE, renderer: <Food /> },
      tail: { size: Constants.GRID_SIZE, elements: [], renderer: <Tail /> }
    }
  }

  reset = () => {
    this.engine.swap(this.gameEngineEntities());
    this.setState({
      isRunning: true
    });
  }

  getGridPosition = () => {
    return this.randomBetween(0, Constants.GRID_SIZE - 1);
  }

  handleDirectionChange(direction) {
    this.engine.dispatch({type: direction});
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <GameEngine
          ref={ref => this.engine = ref}
          style={[{ width: this.boardSize, height: this.boardSize, backgroundColor: '#ffffff', flex: null }]}
          systems={[ GameLoop ]}
          entities={this.gameEngineEntities()}
          running={this.state.isRunning}
          onEvent={this.onEvent}
        >
          <StatusBar hidden={true} />
        </GameEngine>
        <Button 
          title='New Game' 
          onPress={this.reset}
        />
        <ControlButtons handleDirectionChange={this.handleDirectionChange.bind(this)} />
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  }
});