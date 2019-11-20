import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Constants from '../../styles/constants';


export class Tail extends Component {

  constructor(props){
    super(props);
  }

  render() {

    let tailList = this.props.elements.map((el, idx) =>
      <View
        key={idx}
        style={[
          styles.finger,
          { // dynamic styles
            width: this.props.size,
            height: this.props.size,
            left: el[0] * this.props.size,
            top: el[1] * this.props.size,
          }
        ]}
      />
    );

    return (
      <View style={{
        width: Constants.GRID_SIZE * this.props.size,
        height: Constants.GRID_SIZE * this.props.size
      }}>
        {tailList}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  finger: {
    backgroundColor: 'blue',
    position: "absolute"
  }
});
