const maze = require('./maze');
const possibleWalls = ['north', 'west'];
const [mazeWidth, mazeHeight] = maze.size;
console.log(maze.data[maze.pony]);
console.log(getWalkableDirections(maze.pony));

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
