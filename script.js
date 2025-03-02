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

  const markBoardAndCheckResult = (index, turn) => {
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

  return { getBoard, markBoardAndCheckResult, resetBoard, checkWinner };
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

    let result = game.markBoardAndCheckResult(index, turn.getSymbol());

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
    console.log("Game has been reset!");
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

let gameInstance = null;

// Buttons

const startBtn = document.querySelector("#game-start");
const resetBtn = document.querySelector("#game-reset");
const turnInfo = document.querySelector("#turn-information");
const cells = document.querySelectorAll(".cell-button");
const gameTitle = document.querySelector("#game-title");

// Start game

startBtn.addEventListener("click", () => {
  if (gameInstance) {
    console.log("Game is already running! Please reset using reset button.");
    return;
  }
  gameInstance = flow();
  gameTitle.innerHTML =
    'Tic Tac Toe <span style="color: #27B311"> (Game is running) </span>';
  console.log("Game started!");
  turnInfo.innerHTML = `To play : ${gameInstance.getTurn().getName()}`;
});

cells.forEach((cell, index) =>
  cell.addEventListener("click", () => {
    if (!gameInstance) {
      alert("You must click on 'Start game' to begin playing!");
      return;
    }
    if (gameInstance.getWinStatus() || gameInstance.getDrawStatus()) {
      return;
    }

    if (cell.innerHTML !== "") {
      alert("This cell is already occupied!");
      return;
    }
    cell.innerHTML = gameInstance.getTurn().getSymbol();
    gameInstance.playTurn(index);

    if (!gameInstance.getWinStatus() && !gameInstance.getDrawStatus()) {
      turnInfo.innerHTML = `To play : ${gameInstance.getTurn().getName()}`;
    } else {
      setTimeout(() =>
        alert(
          gameInstance.getWinStatus()
            ? `${gameInstance.getTurn().getName()} wins!`
            : "It's a draw!"
        )
      );
    }
  })
);

resetBtn.addEventListener("click", () => {
  if (gameInstance === null) {
    console.log("You cannot reset an inactive game!");
    return;
  }
  if (gameInstance) {
    gameInstance.resetGame();
    document.querySelectorAll(".cell-button").forEach((cell) => {
      cell.innerHTML = "";
      cell.disabled = false;
    });
    gameInstance = null;
    gameTitle.innerHTML = "Tic Tac Toe game";
  }
});
