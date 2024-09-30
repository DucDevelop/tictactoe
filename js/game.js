function createGame(player_name1, player_name2) {
    const board = createBoard();
    const players = [createPlayer(player_name1, true), createPlayer(player_name2, false)];
    let playerTurn = 0;

    function playRound(choice) {
        if(!checkGameOver()) {
            board.addMarker(choice, players[playerTurn].getMarker());
            if(checkGameOver()) {
                let winner = getWinner().winner;
                updateWinner(winner);
            }
            else {
                playerTurn = (playerTurn + 1) % players.length;
            }
        }

        function updateWinner(winner) {
            if(winner) {
                // update score
                winner.setScore(winner.getScore() + 1);
            }
        }
    }

    function getScores() {
        return players.map(x => x.getScore());
    }

    function resetScores() {
        players.forEach(x => x.setScore(0));
    }

    function getActivePlayer() {
        return players[playerTurn];
    }
    
    function getPlayer(num) {
        return players[num];
    }

    function initGame() {
        board.resetField();
        playerTurn = 0;
    }
 
    function getBoard() {
        return board;
    }

    function getWinner() {
        const BOARD_ZONES = {
            row_0: [0, 1, 2],
            row_1: [3, 4, 5],
            row_2: [6, 7, 8],
            col_0: [0, 3, 6],
            col_1: [1, 4, 7],
            col_2: [2, 5, 8],
            diag_0:[0, 4, 8],
            diag_1:[2, 4, 6],
        }
        let winningMark = '';
        
        // loop over board zones and check winning criteria
        for (const [_, fields] of Object.entries(BOARD_ZONES)) {
            // field not empty to avoid comparing empty fields
            if(board.getField([fields[0]])) {
                if(board.getField([fields[0]])===board.getField([fields[1]]) && board.getField([fields[0]]) === board.getField([fields[2]])) {
                    winningMark = board.getField([fields[0]]);
                    return players[0].getMarker() === winningMark ? {winner : players[0], cells: fields} : {winner : players[1], cells: fields};
                }                    
            }
        }
        return {};
    }

    function checkGameOver() {

        return (Object.keys(getWinner()).length !== 0 || !board.isFreeSpaceAvailable());     
    }

    function createBoard() {

        const GAME_FIELDS = 9;
        const MARKERS = ['X','O'];
        let field = Array.from({length: GAME_FIELDS}, val => false);
    
        function addMarker(cell, marker) {
            let success = false;
    
            if(!field[cell] && marker && MARKERS.includes(marker.toUpperCase())) {
                field[cell] = marker.toUpperCase();
                success = true;
            }
            return success;
        }
    
        function isFreeSpaceAvailable() {
            // cell unoccupied means cell === false else true
            // callback: Boolean constructor will return true or false
            return !field.every(Boolean);
        }
    
        function getBoardPretty() {
            let prettyField = [...field].map(val => val? val : '_'); // iterator workaround for accessing empty array elements
            return prettyField.reduce((acc, val, idx) => acc + (idx % 3 === 0 ? `\n${val} ` : `${val} `), '')
        }
    
        function displayPretty() {
            console.log(getBoardPretty());
        }
    
    
        function resetField() {
            field.forEach((_, idx) => field[idx] = false);
        }
    
        function getField(num) {
            if(num >= 0 && num < GAME_FIELDS) {
                return field[num]
            }
        }
    
        return {
            addMarker,
            displayPretty,
            resetField,
            isFreeSpaceAvailable,
            getField,
            getBoardPretty,
        };
    }
    
    
    function createPlayer(name, markerX=true) {
    
        let score = 0;
        const marker = markerX? 'X' : 'O';
    
        function getScore() {
            return score;
        }
        function setScore(val) {
            score = val;
        }
        function getMarker() {
            return marker;
        }
        function getName() {
            return name;
        }
    
        return {
            getScore,
            setScore,
            getMarker,
            getName,
        };
    }

    function drawBoard() {

    }  


    return {
        initGame,
        playRound,
        getScores,
        resetScores,
        getActivePlayer,
        getPlayer,
        getBoard,
        checkGameOver,
        getWinner,
    };
}



// const name1 = 'Guy';
// const name2 = 'Kaka';
// const game = createGame(name1, name2);

// const gameBoardDOM = document.querySelector('div.game-board');
// const gameStartBtn = document.querySelector('#start-game');

// gameBoardDOM.addEventListener('click', e => {

//     let element = null;
//     // if clicked on span , div
//     if(e.target.classList.contains('cell-value')) {
//         element = e.target.parentNode;
//     } else if (e.target.classList.contains('game-board-cell')) {
//         element = e.target;
//     }

//     if(element && !element.classList.contains('disabled')) {

//         console.log(element.getAttribute('data-cell'), game.getActivePlayer().getMarker());
//         element.firstElementChild.textContent = game.getActivePlayer().getMarker();
//         game.playRound(+element.getAttribute('data-cell'));
//         element.classList.add('disabled');

//         if(game.checkGameOver()) {
//             disableFields();
//             gameStartBtn.disabled = false;
//             if(game.getWinner().winner) {
//                 console.log(game.getWinner().winner);
//             }
//         } 
        
//     }
// })

// gameStartBtn.addEventListener('click', (e) => {
//     gameStartBtn.disabled = true;
//     game.initGame();
//     enableFields();

// })

// function enableFields() {
//     const boardFields = document.querySelectorAll('div.game-board-cell');
//     boardFields.forEach(x => x.classList.remove('disabled'));
// }
// function disableFields() {
//     const boardFields = document.querySelectorAll('div.game-board-cell');
//     boardFields.forEach(x => x.classList.add('disabled'));
// }

// disableFields();
export {createGame};

// game finished:
    // score management
    // disable fields
    // winner message
    // line marking winnner if not draw
    // activate button to start new game

// game start:
    // disable start button
    // init game