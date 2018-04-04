const maze = require('./maze');

const [mazeWidth, mazeHeight] = maze.size;
const [PONY] = maze.pony;
const [END_POINT] = maze['end-point'];
const possibleWalls = ['north', 'west'];

const positionByDirection = {
  north: start => start - mazeWidth,
  west: start => start - 1,
  south: start => start + mazeWidth,
  east: start => start + 1
};

// get direction when moving to nearest position
function getDirectionName(startPosition, endPosition) {
  const delta = endPosition - startPosition;
  switch (delta) {
    case 1: return 'east';
    case -1: return 'west';
    case mazeWidth: return 'south';
    case -mazeWidth: return 'north';
  }
}

/**
 * Paths data structure
 *
 * is an object where keys are weights and values are positions with this weight
 */


console.log(getShortestPath(PONY, END_POINT));

function getShortestPath(sourcePosition, targetPosition) {
  const weightedPaths = {paths: {}, maxWeight: 0};
  weightedPaths.paths[weightedPaths.maxWeight] = targetPosition;

  let lastWeightedPositions = [targetPosition];
  while (!lastWeightedPositions.includes(sourcePosition)) {
    // retrieving new weighted positions until we reach the startPosition
    lastWeightedPositions = lastWeightedPositions.reduce((newWeightedPositions, position) => {

      return [...newWeightedPositions, ...weightNextStep(position, weightedPaths.paths, weightedPaths.maxWeight)];
    }, []);
    // increase max weight if at least one new position weighted
    lastWeightedPositions.length > 0 && weightedPaths.maxWeight++;
  }
  // go down the road to find the target position (reverse walking from the source to target following the shortest path)
  // for (let reverseStep = weightedPaths.maxWeight; reverseStep > 0; reverseStep--) {
  //   const index = weightedPaths.paths.findIndex(reverseStep);
  //   console.log(index);
  // }

  return weightedPaths;
}

function weightNextStep(position, paths, maxWeight) {
  const stepWeight = maxWeight + 1;
  // get positions to be wighted based on walkable directions
  const stepWeightedPositions = getWalkableDirections(position)
    .map(direction => positionByDirection[direction](position))
    // filter out already weighted position to avoid moving back
    .filter(positionToBeWeighted => !paths[stepWeight] || !paths[stepWeight].includes(positionToBeWeighted));
  // wighting positions based on weight of previous steps
  stepWeightedPositions.forEach(weightedPosition => {
    !paths[stepWeight] && (paths[stepWeight] = []);
    paths[stepWeight].push(weightedPosition);
  });

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
