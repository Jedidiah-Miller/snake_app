import Constants from '../../styles/constants';
import { ENGINE_DISPATCH_TYPES } from '../Controls/EngineDispatchTypes';


const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const didHitWall = (head) => {
  const maxDistance = Constants.MAX_WIDTH / Constants.GRID_SIZE;
  return (
    head.position[0] + head.xspeed < 0 ||
    head.position[0] + head.xspeed >= maxDistance ||
    head.position[1] + head.yspeed < 0 ||
    head.position[1] + head.yspeed >= maxDistance
  );
};

const didHitSelf = (head, tail, i) => {
  return tail.elements[i][0] === head.position[0] && tail.elements[i][1] === head.position[1];
};

const didEatFood = (head, food) => {
  return head.position[0] === food.position[0] && head.position[1] === food.position[1];
};

const gameOverDispatch = { type: ENGINE_DISPATCH_TYPES.gameOver };

export const GameLoop = (entities, { dispatch, events }) => {

  let { head, food, tail } = entities;

  if (events.length) {
    for (let i = 0; i < events.length; i++) {

      if (events[i].type === ENGINE_DISPATCH_TYPES.down && head.yspeed != -1) {
        head.yspeed = 1;
        head.xspeed = 0;
      } else if (events[i].type === ENGINE_DISPATCH_TYPES.up && head.yspeed != 1) {
        head.yspeed = -1;
        head.xspeed = 0;
      } else if (events[i].type === ENGINE_DISPATCH_TYPES.left && head.xspeed != 1) {
        head.yspeed = 0;
        head.xspeed = -1;
      } else if (events[i].type === ENGINE_DISPATCH_TYPES.right && head.xspeed != -1) {
        head.yspeed = 0;
        head.xspeed = 1;
      } else {
        console.log('not doing a turn');
      }
    }
  }

  head.nextMove -= 1;
  if (head.nextMove === 0) {
    head.nextMove = head.updateFrequency;
    if (didHitWall(head)) {
      // snake hits the wall
      console.log('you done hit that wall there');
      dispatch(gameOverDispatch)
    } else {
      // move the tail
      let newTail = [[head.position[0], head.position[1]]];
      tail.elements = newTail.concat(tail.elements).slice(0, -1);
      // snake moves
      head.position[0] += head.xspeed;
      head.position[1] += head.yspeed;

        // check if it hits the tail
      for (let i = 0; i < tail.elements.length; i++) {
        if (didHitSelf(head, tail, i)){
          dispatch(gameOverDispatch)
        }
      }

      if (didEatFood(head, food)) {
        // eating Food
        tail.elements = [[food.position[0], food.position[1]]].concat(tail.elements);

        food.position[0] = randomBetween(0, Constants.GRID_SIZE - 1);
        food.position[1] = randomBetween(0, Constants.GRID_SIZE - 1);
      }
    }
  }

  return entities;
};