function createBoard() {

    const GAME_FIELDS = 9;
    const MARKERS = ['X','O'];
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

    let field = Array.from({length: GAME_FIELDS}, val => false);
    // winner mark or empty if draw
    let winner = '';

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

    function getWinner() {
        let winningMark = '';
        // loop over board zones and check winning criteria
        for (const [_, fields] of Object.entries(BOARD_ZONES)) {
            // field not empty to avoid comparing empty fields
            if(field[fields[0]]) {
                if(field[fields[0]]===field[fields[1]] && field[fields[0]] === field[fields[2]]) {
                    winningMark = field[fields[0]];
                    break;
                }                    
            }
        }
        return winningMark;
    }

    function checkGameOver() {
        // game over when either there is a winner or no space left
        return Boolean(getWinner()) || !isFreeSpaceAvailable();     
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
        getWinner,
        checkGameOver,
        displayPretty,
        resetField,
        isFreeSpaceAvailable,
        getField,
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

function createGame(player_name1, player_name2) {
    const board = createBoard();
    const players = [createPlayer(player_name1, true), createPlayer(player_name2, false)];
    let playerTurn = 0;

    function playGame() {
        resetGame();

        do {
            playRound();
            playerTurn = (playerTurn + 1) % players.length;
        } while(!board.checkGameOver())
    
        let winner = board.getWinner();
        if(winner) {
            // update score
            players.forEach(x => {
                if(x.getMarker() === winner) {
                    x.setScore(x.getScore() + 1);
                }
            });
        }
        else {
            // no winner
        }
    }

    function playRound() {
        // check if available fields
        board.addMarker(getPlayerInput(players[playerTurn]), players[playerTurn].getMarker());

        function getPlayerInput(player) {
            let choice = 0;
            board.displayPretty();
            do {
                // choice = Math.floor(Math.random() * 9);
                choice = +prompt(`${player.getName()}: Which field?`);
            } while(board.getField(choice))
            return choice;
        }

    }

    function resetGame() {
        board.resetField();
        playerTurn = 0;
    }





    return {
        playGame,
        playRound,
        board,
        players,
    };
}



export {createBoard, createPlayer, createGame};