const maze = require('./maze');

const [mazeWidth, mazeHeight] = maze.size;
const [END_POINT] = maze['end-point'];
const possibleWalls = ['north', 'west'];
const weightedPaths = {paths: [], maxValue: 0};
weightedPaths.paths[END_POINT] = weightedPaths.maxValue;

const positionByDirection = {
  north: start => start - mazeWidth,
  west: start => start - 1,
  south: start => start + mazeWidth,
  east: start => start + 1
};

const [PONY] = maze.pony;

let lastWeightedPositions = [END_POINT];
while (!lastWeightedPositions.includes(PONY)) {
  // retrieving new weighted positions until we reach the pony
  lastWeightedPositions = lastWeightedPositions.reduce((newWeightedPositions, position) => {

    return [...newWeightedPositions, ...weightNextStep(position)];
  }, []);
}

console.log(weightedPaths);

function weightNextStep(position) {
  const stepWeight = ++weightedPaths.maxValue;
  // get positions to be wighted based on walkable directions
  const stepWeightedPositions = getWalkableDirections(position)
    .map(direction => positionByDirection[direction](position))
    // filter out already weighted position to avoid moving back
    .filter(positionToBeWeighted => weightedPaths.paths[positionToBeWeighted] === undefined);
  // wighting positions based on weight of previous steps
  stepWeightedPositions.forEach(weightedPosition => weightedPaths.paths[weightedPosition] = stepWeight);

  return stepWeightedPositions;
}

function getWalkableDirections(position) {
  const walls = maze.data[position];
  const walkableDirections = possibleWalls.filter(direction => !walls.includes(direction));
  // check for maze dimensions
  // check if there is a wall on the east direction (if it is on the west direction of the east cell)
  if (maze.data[position + 1] && !maze.data[position + 1].includes('west')) {
    walkableDirections.push('east');
  }
  // check for maze dimensions
  // check if there is a wall on the south direction (if it is on the north direction of the south cell)
  if (maze.data[position + mazeWidth] && !maze.data[position + mazeWidth].includes('north')) {
    walkableDirections.push('south');
  }

  return walkableDirections;
}

