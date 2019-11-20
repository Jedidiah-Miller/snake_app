import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get("screen");

export default Constants = {
  MAX_WIDTH: width,
  MAX_HEIGHT: height,
  GRID_SIZE: 15,
  CELL_SIZE: 20
}