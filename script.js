const cells = document.querySelectorAll('[data-cell]');
const winningMessage = document.getElementById('winningMessage');
const winningMessageText = document.getElementById('winningMessageText');
const newGameButton = document.getElementById('newGameButton');

let currentPlayer = 'X';

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWin() {
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return cells[a].textContent;
        }
    }
    return [...cells].every(cell => cell.textContent) ? 'Draw' : null;
}

function handleClick(event) {
    const cell = event.target;
    if (cell.textContent || winningMessage.style.display === 'flex') return;
    cell.textContent = currentPlayer;
    const winner = checkWin();
    if (winner) {
        winningMessageText.textContent = winner === 'Draw' ? 'It\'s a Draw!' : `${winner} Wins!`;
        winningMessage.style.display = 'flex';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function restartGame() {
    cells.forEach(cell => cell.textContent = '');
    winningMessage.style.display = 'none';
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
newGameButton.addEventListener('click', restartGame);
