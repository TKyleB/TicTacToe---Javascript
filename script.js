const playerFactory = (symbol) => {
    return { symbol };
};

const boardFactory = () => {
    const board = []


    return { board };
}


const game = () => {
    const playerOne = playerFactory("X");
    const playerTwo = playerFactory("O");
    let currentTurn = playerOne;
    let turnCount = 1;
    let gameOver = false;
    const board = boardFactory();

    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", resetGame);


    function addClickEvents() {
        const cells = document.querySelectorAll("div.cell")
        cells.forEach(e => e.addEventListener("click", gameLoop, { once: true }))
    };

    function gameLoop(event) {
        if (!gameOver) {
            event.target.textContent = currentTurn.symbol;
            turnCount++;
            updateArray()
            if (checkWin()) {
                gameOver = true;
                updateWinText();
            }
            else {
                if (currentTurn == playerOne) currentTurn = playerTwo;
                else currentTurn = playerOne;
            }


            console.log(currentTurn.symbol);

        }

    };

    //Update Array
    function updateArray() {
        const cells = document.querySelectorAll("div.cell");
        for (let i = 0; i < cells.length; i++) {
            board[i] = cells[i].textContent;
        }
        console.log(board);
    };

    //Check Win
    function checkWin() {
        let topRow = board[0] + board[1] + board[2];
        let middleRow = board[3] + board[4] + board[5];
        let bottomRow = board[6] + board[7] + board[8];
        let leftColumn = board[0] + board[3] + board[6];
        let middleColumn = board[1] + board[4] + board[7];
        let rightColumn = board[2] + board[5] + board[8];
        let rightDiagonal = board[0] + board[4] + board[8];
        let leftDiagonal = board[2] + board[4] + board[6];

        if (topRow == "XXX" || topRow == "OOO") return true;
        else if (middleRow == "XXX" || middleRow == "OOO") return true;
        else if (bottomRow == "XXX" || bottomRow == "OOO") return true;
        else if (rightDiagonal == "XXX" || rightDiagonal == "OOO") return true;
        else if (leftDiagonal == "XXX" || leftDiagonal == "OOO") return true;
        else if (leftColumn == "XXX" || leftColumn == "OOO") return true;
        else if (middleColumn == "XXX" || middleColumn == "OOO") return true;
        else if (rightColumn == "XXX" || rightColumn == "OOO") return true;
        else if (turnCount == 10) return true;
        else return false;


    }

    function updateWinText() {
        const winnerText = document.getElementById("winner");
        const winnerHeader = document.querySelector("h3");
        winnerHeader.style.display = "block";
        if (turnCount == 10) winnerText.textContent = "Its a tie!";
        else winnerText.textContent = `Player ${currentTurn.symbol} Wins!`;


    }

    function resetGame() {
        const cells = document.querySelectorAll("div.cell");
        const winnerHeader = document.querySelector("h3");
        cells.forEach(e => {
            e.textContent = "";
            e.removeEventListener("click", gameLoop, { once: true });
            e.addEventListener("click", gameLoop, { once: true });

        });
        updateArray();
        winnerHeader.style.display = "none";
        gameOver = false;
        turnCount = 1;
        currentTurn = playerOne;

    }

    //Game Loop
    addClickEvents();


    return { updateArray, board, checkWin, gameOver, resetGame }


}


let ticTacToe = game();
