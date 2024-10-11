const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleBoxClick = (index) => {
  if (gameState[index] !== '' || !gameActive) {
    return;
  }

  gameState[index] = currentPlayer;
  boxes[index].textContent = currentPlayer;

  checkResult();
};

const checkResult = () => {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
      continue;
    }
    if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameInfo.textContent = `${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    gameInfo.textContent = `It's a draw!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameInfo.textContent = `It's ${currentPlayer}'s turn`;
};

const resetGame = () => {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', '', ''];
  gameInfo.textContent = `It's ${currentPlayer}'s turn`;
  boxes.forEach(box => {
    box.textContent = '';
  });
};

boxes.forEach((box, index) => {
  box.addEventListener('click', () => handleBoxClick(index));
});

newGameBtn.addEventListener('click', resetGame);

resetGame();
