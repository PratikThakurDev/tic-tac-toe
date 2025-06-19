const Player = (name, marker) => {
  return { name, marker };
};

const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const setCell = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const checkWin = (marker) => {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winCombos.some(combo => combo.every(i => board[i] === marker));
  };

  const checkTie = () => {
    return board.every(cell => cell !== "");
  };

  return { getBoard, setCell, reset, checkWin, checkTie };
})();

const DisplayScreens = (() => {
  const inputSection = document.querySelector("#input-section");
  const messageSection = document.querySelector("#message-section");
  const playingSection = document.querySelector("#playing-section");
  const welcomeBox = document.querySelector("#welcome-box");
  const boardCells = document.querySelectorAll("#gameBoard div");
  const status = document.querySelector("#status p:last-child");

  const start = () => {
    inputSection.style.display = 'none';
    messageSection.style.display = 'block';
  };

  const playMode = (player1, player2, game) => {
    welcomeBox.style.display = "none";
    messageSection.style.display = "none";
    playingSection.style.display = 'flex';

    document.querySelector("#player1 p:last-child").textContent = player1.name;
    document.querySelector("#player2 p:last-child").textContent = player2.name;

    boardCells.forEach((cell, index) => {
      cell.textContent = "";
      cell.onclick = () => game.validMove(index);
    });
  };

  const renderBoard = () => {
    const board = Gameboard.getBoard();
    board.forEach((mark, i) => {
      boardCells[i].textContent = mark;
    });
  };

  const setStatus = (msg) => {
    status.textContent = msg;
  };

  const bindRestart = (callback) => {
    const restartBtn = document.querySelector("#restartBtn button");
    if (restartBtn) {
      restartBtn.addEventListener("click", callback);
    }
  };

  return { start, playMode, renderBoard, setStatus, bindRestart };
})();

const gameLogic = (player1, player2, vsComputer = false) => {
  let currentPlayer = player1;
  let gameOver = false;

  const validMove = (index) => {
    if (gameOver || !Gameboard.setCell(index, currentPlayer.marker)) return;

    DisplayScreens.renderBoard();

    if (Gameboard.checkWin(currentPlayer.marker)) {
      DisplayScreens.setStatus(`${currentPlayer.name} wins!`);
      gameOver = true;
      return;
    }

    if (Gameboard.checkTie()) {
      DisplayScreens.setStatus("It's a tie!");
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    DisplayScreens.setStatus(`${currentPlayer.name}'s turn`);

    if (vsComputer && currentPlayer === player2) {
      setTimeout(() => {
        computerMove();
      }, 500);
    }
  };

  const computerMove = () => {
    const board = Gameboard.getBoard();
    const emptyIndices = board.map((val, i) => val === "" ? i : null).filter(i => i !== null);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    validMove(randomIndex);
  };

  const restart = () => {
    Gameboard.reset();
    gameOver = false;
    currentPlayer = player1;
    DisplayScreens.renderBoard();
    DisplayScreens.setStatus(`${currentPlayer.name}'s turn`);
  };

  return { validMove, restart };
};

const DOMmanipulation = () => {
  const startBtn = document.querySelector("#start-btn");
  const compBtn = document.querySelector(".computer");
  const humanBtn = document.querySelector(".human");
  const display = DisplayScreens;

  let player1Name = "";

  startBtn.addEventListener("click", () => {
    player1Name = document.querySelector("#player-name").value.trim() || "Player 1";
    display.start();
  });

  humanBtn.addEventListener("click", () => {
    const name2 = prompt("Enter Player 2 name") || "Player 2";
    const player1 = Player(player1Name, "X");
    const player2 = Player(name2, "O");
    const game = gameLogic(player1, player2, false);
    display.playMode(player1, player2, game);
    display.setStatus(`${player1.name}'s turn`);
    display.bindRestart(game.restart);
  });

  compBtn.addEventListener("click", () => {
    const player1 = Player(player1Name, "X");
    const player2 = Player("Computer", "O");
    const game = gameLogic(player1, player2, true);
    display.playMode(player1, player2, game);
    display.setStatus(`${player1.name}'s turn`);
    display.bindRestart(game.restart);
  });
};

DOMmanipulation();