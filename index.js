// function createGameBoard() {
//   let board = [
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//   ];
//   return board;
// }

// function createKnight(position) {
//     let xLoc = position[0];
//     let yLoc = position[1];
//     let board = createGameBoard();
//     board[yLoc][xLoc] = "knight";
//     return board;
//   }

class Square {
  constructor(row, col, movesFromStart, pathFromStart) {
    this.row = row;
    this.col = col;
    this.movesFromStart = movesFromStart;
    this.pathFromStart = pathFromStart;
  }

  printPosition() {
    return `[${this.row}, ${this.col}]`;
  }
}

// Only Difference is Input is an Array not an Ordered Pair
function legalMoves(position) {
  let legalMoves = [
    [position[0] - 2, position[1] - 1],
    [position[0] - 2, position[1] + 1],
    [position[0] - 1, position[1] - 2],
    [position[0] - 1, position[1] + 2],
    [position[0] + 1, position[1] - 2],
    [position[0] + 1, position[1] + 2],
    [position[0] + 2, position[1] - 1],
    [position[0] + 2, position[1] + 1],
  ];
  let possibleMoves = [];
  for (let i = 0; i < 8; i++) {
    if (
      legalMoves[i][0] <= 7 &&
      legalMoves[i][0] >= 0 &&
      legalMoves[i][1] <= 7 &&
      legalMoves[i][1] >= 0
    ) {
      possibleMoves.push(legalMoves[i]);
    }
  }
  return possibleMoves;
}

const displayResult = (movesFromStart, pathFromStart) => {
  return `You made it in ${movesFromStart} moves! Here's your path: ${pathFromStart.join(
    " - "
  )}`;
};

function knightTravails(position, result) {
  let startRow = position[0];
  let startCol = position[1];
  let resultRow = result[0];
  let resultCol = result[1];
  const queue = [];
  const startSquare = new Square(startRow, startCol, 0, [[startRow, startCol]]);
  queue.push(startSquare);

  const visited = new Set();

  while (queue.length > 0) {
    const square = queue.shift();
    const { row, col, movesFromStart, pathFromStart } = square;

    if (row === resultRow && col === resultCol)
      return displayResult(movesFromStart, pathFromStart);
    visited.add(square.printPosition());

    for (const legalMove of legalMoves([row, col])) {
      const [moveRow, moveCol] = legalMove;
      const moveSquare = new Square(moveRow, moveCol, movesFromStart + 1, [
        ...pathFromStart,
        [moveRow, moveCol],
      ]);
      if (visited.has(moveSquare.printPosition())) continue;
      queue.push(moveSquare);
    }
  }
}

console.log(knightTravails([0, 0], [0, 0]));
console.log(knightTravails([0, 0], [3, 3]));
console.log(knightTravails([3, 3], [0, 0]));
console.log(knightTravails([3, 3], [1, 4]));
