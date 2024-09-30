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

function createGame(player_name1, player_name2) {
    const board = createBoard();
    const players = [createPlayer(player_name1, true), createPlayer(player_name2, false)];
    let playerTurn = 0;

    function playRound(choice) {
        if(!checkGameOver()) {
            board.addMarker(choice, players[playerTurn].getMarker());
            if(checkGameOver()) {
                let winner = getWinner();
                updateWinner(winner);
            }
            else {
                playerTurn = (playerTurn + 1) % players.length;
            }
        }

        function updateWinner(winnerMark) {
            if(winnerMark) {
                // update score
                players.forEach(x => {
                    if(x.getMarker() === winnerMark) {
                        x.setScore(x.getScore() + 1);
                    }
                });
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
                    break;
                }                    
            }
        }
        return winningMark;
    }

    function checkGameOver() {
        return Boolean(getWinner()) || !board.isFreeSpaceAvailable();     
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



export {createBoard, createPlayer, createGame};