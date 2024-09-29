let playerXName = '';
let playerOName = '';
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

function startGame() {
    playerXName = document.getElementById('playerX').value || 'Player X';
    playerOName = document.getElementById('playerO').value || 'Player O';

    if (playerXName === playerOName) {
        alert("Player names cannot be the same.");
        return;
    }

    gameActive = true;
    document.getElementById('playerX').disabled = true;
    document.getElementById('playerO').disabled = true;
    document.getElementById('start-button').disabled = true;
    document.getElementById('message').innerText = `${playerXName}'s turn`;
}

function makeMove(cellIndex) {
    if (!gameActive) return;

    if (board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        document.getElementsByClassName('cell')[cellIndex].innerText = currentPlayer;
        document.getElementsByClassName('cell')[cellIndex].classList.add(currentPlayer);

        if (checkWin()) {
            const winnerName = board[cellIndex] === 'X' ? playerXName : playerOName;
            document.getElementById('message').innerText = `${winnerName} wins!`;
            gameActive = false;
            showWinnerPopup(winnerName);
        } else if (board.indexOf('') === -1) {
            document.getElementById('message').innerText = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('message').innerText = `${currentPlayer}'s turn`;
        }
    }
}

function checkWin() {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function showWinnerPopup(winnerName) {
    if (confirm(`${winnerName} wins! Play again?`)) {
        resetGame();
    }
}

function resetGame() {
    playerXName = '';
    playerOName = '';
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = false;

    document.getElementById('playerX').value = '';
    document.getElementById('playerO').value = '';
    document.getElementById('playerX').disabled = false;
    document.getElementById('playerO').disabled = false;
    document.getElementById('start-button').disabled = false;

    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O');
    });

    document.getElementById('message').innerText = 'Enter player names and click Start Game.';
}
