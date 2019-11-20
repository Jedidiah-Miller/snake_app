import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ENGINE_DISPATCH_TYPES } from './EngineDispatchTypes';


export function ControlButtons({handleDirectionChange}) {
  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity onPress={() => handleDirectionChange(ENGINE_DISPATCH_TYPES.up) }>
            <View style={styles.control} />
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity onPress={() => handleDirectionChange(ENGINE_DISPATCH_TYPES.left) }>
            <View style={styles.control} />
          </TouchableOpacity>
          <View style={[styles.control, { backgroundColor: null}]} />
          <TouchableOpacity onPress={() => handleDirectionChange(ENGINE_DISPATCH_TYPES.right) }>
            <View style={styles.control} />
          </TouchableOpacity>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity onPress={() => handleDirectionChange(ENGINE_DISPATCH_TYPES.down) }>
            <View style={styles.control} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controls: {
    width: 300,
    height: 300,
    flexDirection: 'column',
  },
  controlRow: {
    height: 100,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  control: {
    width: 100,
    height: 100,
    backgroundColor: 'blue'
  }
});