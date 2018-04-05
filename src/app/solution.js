const maze = require('./maze');
const possibleWalls = ['north', 'west'];

/**
 * Paths data structure
 *
 * is an object where keys are weights and values are positions with this weight
 */

export class Solution {
  constructor(maze) {
    this.maze = maze;
    this.positionByDirection = {
      north: start => start - this.mazeWidth,
      west: start => start - 1,
      south: start => start + this.mazeWidth,
      east: start => start + 1
    };
  }

  get mazeWidth() {

    return this.maze.size[0];
  }

  get mazeHeight() {

    return this.maze.size[1];
  }

  get pony() {

    return this.maze.pony[0];
  }

  get endPoint() {

    return this.maze['end-point'][0];
  }

  getDirectionName(startPosition, endPosition) {
    const delta = endPosition - startPosition;
    switch (delta) {
      case 1: return 'east';
      case -1: return 'west';
      case this.mazeWidth: return 'south';
      case -this.mazeWidth: return 'north';
    }
  }

  getShortestPath(sourcePosition, targetPosition) {
    const weightedPaths = {paths: {}, maxWeight: 0};
    weightedPaths.paths[weightedPaths.maxWeight] = [targetPosition];

    let lastWeightedPositions = [targetPosition];
    while (!lastWeightedPositions.includes(sourcePosition)) {
      // retrieving new weighted positions until we reach the startPosition
      lastWeightedPositions = lastWeightedPositions.reduce((newWeightedPositions, position) => {

        return [...newWeightedPositions, ...this.weightNextStep(position, weightedPaths.paths, weightedPaths.maxWeight)];
      }, []);
      // increase max weight if at least one new position weighted
      lastWeightedPositions.length > 0 && weightedPaths.maxWeight++;
    }

    // go down the road to find the target position (reverse walking from the source to target following the shortest path)
    const directionsToTheTarget = [];
    let currentPosition = sourcePosition;
    // const positionsHistory = [currentPosition];
    for (let reverseStep = weightedPaths.maxWeight - 1; reverseStep >= 0; reverseStep--) {
      const stepWeightedPositions = weightedPaths.paths[reverseStep];
      const walkableDirections = this.getWalkableDirections(currentPosition);
      const direction = walkableDirections.find(direction => {
        // make sure new position is weighted, so belongs to the shortest path
        return stepWeightedPositions.includes(this.positionByDirection[direction](currentPosition));
      });
      // memorize the direction
      directionsToTheTarget.push(direction);
      // move to the next position
      currentPosition = this.positionByDirection[direction](currentPosition);
      // positionsHistory.push(currentPosition);
    }

    return directionsToTheTarget;
  }

  getWalkableDirections(position) {
    const walls = this.maze.data[position];
    const walkableDirections = possibleWalls.filter(direction => !walls.includes(direction));
    // check for maze dimensions
    // check if there is a wall on the east direction (if it is on the west direction of the east cell)
    if (this.maze.data[position + 1] && !this.maze.data[position + 1].includes('west')) {
      walkableDirections.push('east');
    }
    // check for maze dimensions
    // check if there is a wall on the south direction (if it is on the north direction of the south cell)
    if (this.maze.data[position + this.mazeWidth] && !this.maze.data[position + this.mazeWidth].includes('north')) {
      walkableDirections.push('south');
    }

    return walkableDirections;
  }

  weightNextStep(position, paths, maxWeight) {
    const stepWeight = maxWeight + 1;
    // get positions to be wighted based on walkable directions
    const stepWeightedPositions = this.getWalkableDirections(position)
      .map(direction => this.positionByDirection[direction](position))
      // filter out already weighted position to avoid moving back
      .filter(positionToBeWeighted => !paths[stepWeight] || !paths[stepWeight].includes(positionToBeWeighted));
    // wighting positions based on weight of previous steps
    stepWeightedPositions.forEach(weightedPosition => {
      !paths[stepWeight] && (paths[stepWeight] = []);
      paths[stepWeight].push(weightedPosition);
    });

    return stepWeightedPositions;
  }
}
