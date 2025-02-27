function gameboard() {
  let board = ["", "", "", "", "", "", "", "", ""];
  const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getBoard = () => board;

  const markBoard = (index, turn) => {
    if (board[index] === "") {
      board[index] = turn;
    } else {
      console.log("Invalid move! Cell already occupied.");
      return false;
    }

    if (checkWinner()) {
      console.log(`${turn} wins!`);
      return true;
    }

    if (board.every((cell) => cell !== "")) {
      return "draw";
    }

    return false;
  };

  const checkWinner = () => {
    return winners.some((combination) => {
      const [a, b, c] = combination;
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, markBoard, resetBoard, checkWinner };
}

function player(name, symbol) {
  const playerName = name;
  const playerSymbol = symbol;

  const getName = () => name;
  const getSymbol = () => symbol;

  return { getName, getSymbol };
}

function flow() {
  const game = gameboard();

  let score = 0;

  let draw = false;
  let win = false;

  const P1 = player("Player 1", "X");
  const P2 = player("Player 2", "O");

  let turn = P1;

  const getTurn = () => turn;
  const setTurn = (player) => (turn = player);
  const changeTurn = () => (turn === P1 ? (turn = P2) : (turn = P1));

  const playTurn = (index) => {
    if (win) {
      console.log("Game over! Reset to play again.");
      return;
    }

    let result = game.markBoard(index, turn.getSymbol());

    console.log(game.getBoard());

    if (result === "draw") {
      draw = true;
      console.log("It's a draw");
    } else if (result) {
      console.log(`${turn.getName()} wins!`);
      win = true;
    } else {
      changeTurn();
      console.log(`Next turn: ${turn.getName()}`);
    }
  };

  const getScore = () => score;
  const getDrawStatus = () => draw;
  const setDrawStatus = () => (draw = true);
  const getWinStatus = () => win;
  const setWinStatus = () => (win = true);

  const resetGame = () => {
    game.resetBoard();
    win = false;
    draw = false;
    turn = P1;
    console.log("Game reset!");
  };

  return {
    getTurn,
    setTurn,
    changeTurn,
    getScore,
    resetGame,
    getDrawStatus,
    setDrawStatus,
    getWinStatus,
    setWinStatus,
    playTurn,
  };
}

const game = flow();
game.playTurn(0);
game.playTurn(1);
game.playTurn(4);
game.playTurn(2);
game.playTurn(8);
game.resetGame();
