// DONE A heading should say whether it is X’s or O’s turn and change with each move made.

// DONE Create a tic-tac-toe grid using your HTML element of choice. When a cell in the grid is clicked, 
//an X or O should appear in that spot depending on whose turn it is.

// When a player has won, or the board is full and the game results in a draw, 
//a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.

//DONE A button should be available to clear the grid and restart the game.




//create players
let turns = 0;
const player1 = 'X';
const player2 = 'O';

player1Scores = [];
player2Scores = [];

//set up winning combinations
const winningCombos = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6'],
]

const cells = $('.cell');


startGame();

function startGame() {
    //hides the pop up at the end of the game
    $(".end-game").hide();
    turns = 0;
    $('.alert-turn').text(`Player 1's Turn`)
    cells.text('');
    switchTurns();
    }


function switchTurns() {
   cells.one('click', function () {
       if(turns % 2 == 0) {
           $(this).text(player1);
           player1Scores.push(this.id);
           
           let win = checkWinner('PLAYER 1', player1Scores);
           checkTie(turns, win);
           turns++;
           console.log(turns)
           $('.alert-turn').text(`Player 2's turn`);
       } else {
           $(this).text(player2);
           player2Scores.push(this.id);
           
           let win = checkWinner('PLAYER 2', player2Scores);
           checkTie(turns, win);
           turns++;
           console.log(turns)
           $('.alert-turn').text(`Player 1's turn`)
       }
   })
}

function checkWinner(player, playerScores){
    if(playerScores.length >= 2) {
        for(let i = 0; i < winningCombos.length; i++) {
            if(winningCombos[i].every(elem => playerScores.includes(elem))) {
                endGame(player);
                declareWinner(player);
                return 1;
            }  
        } 
    } 
    return 0;
} 



function checkTie(squaresPlayed, win) {
    console.log(squaresPlayed)
    if(squaresPlayed == 8 && win == 0) {
        console.log(`It's a tie`);
       document.querySelector('.end-game').style.display = "block";
       document.querySelector('.end-game .text').textContent = `It's a tie`;
       endGame();
    }
}

function endGame(player) {
    //turn off event listener
    cells.off('click');
    player1Scores = [];
    player2Scores = [];
    // declareWinner(player)
}

function declareWinner(winner) {
    document.querySelector('.end-game').style.display = "block";
    document.querySelector('.end-game .text').textContent = `${winner} WINS!`;
}