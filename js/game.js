let name1 = '';
let name2 = '';

let game = null;
let controller = null;

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

function createViewController(game) {

    const gameState = game;

    function enableFields() {
        const boardFields = document.querySelectorAll('div.game-board-cell');
        boardFields.forEach(x => x.classList.remove('disabled'));
    }
    function disableFields() {
        const boardFields = document.querySelectorAll('div.game-board-cell');
        boardFields.forEach(x => x.classList.add('disabled'));
    }
    
    function drawBoard() {
        const board = gameState.getBoard();
        const boardFields = document.querySelectorAll('div.game-board-cell');
        boardFields.forEach((element, idx) => {
            if(board.getField(idx)) {
                element.firstChild.textContent = board.getField(idx);
                element.classList.add('disabled');
            }
            else {
                element.firstChild.textContent = '';
            }
        })
        drawWinningLine(gameState.getWinner().cells);


    }

    function drawWinningLine(cells) {
        let addClass = '';
        const containerSelector = 'div.cross-line';

        if(cells) {
            const linePositions = {
                'row-0' : [0,1],
                'row-1' : [3,4],
                'row-2' : [6,7],
                'col-0' : [0,3],
                'col-1' : [1,4],
                'col-2' : [2,5],
                'diag-0' : [0,4],
                'diag-1' : [2,4],
            }
    
            for (const [key, fields] of Object.entries(linePositions)) {
                if(fields.every(number => cells.includes(number))) {
                    addClass = `cross-${key}`;
                    break
                }
            }
            document.querySelector(containerSelector).classList.add(addClass);
        }
        else {
            const matchClass = new RegExp(/(row|col|diag)-[0-2]/, 'g');
            const classList = Array.from(document.querySelector(containerSelector).classList);
            const crossClasses = classList.filter((token) => token.match(matchClass));
            crossClasses.forEach(cssClass => document.querySelector(containerSelector).classList.remove(cssClass));
        }

    }

    function updateScoreBoard() {
        const scoreBoard = Array.from(document.querySelector('div.score-board').children);
        scoreBoard.forEach((element, idx) => {
            element.children[0].textContent = gameState.getPlayer(idx).getName()
            element.children[1].textContent = gameState.getPlayer(idx).getScore()
        })
    }
    
    return {
        enableFields,
        disableFields,
        drawBoard,
        updateScoreBoard,
    }
};


const gameBoardDOM = document.querySelector('div.game-board');
const gameStartBtn = document.querySelector('#start-game');
const resetScoreBtn = document.querySelector('#reset-score');
const modalBtnNext = document.querySelector('#modal-next');
const modalBtnSubmit = document.querySelector('#modal-submit');


modalBtnNext.addEventListener('click', (e) => {
    e.preventDefault();
    const inputText1 = document.querySelector('form > div:first-child');
    const inputText2 = document.querySelector('form > div:last-child');
    inputText1.setAttribute('style', 'display : none');
    inputText2.setAttribute('style', 'display : block');
})

modalBtnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    name1 = document.querySelector('input#player-name1').value;
    name2 = document.querySelector('input#player-name2').value;
    const modal = document.querySelector('div.player-input-modal');
    modal.setAttribute('style', 'display : none');
    game = createGame(name1, name2);
    controller = createViewController(game);
    controller.disableFields();
    controller.updateScoreBoard();
})


resetScoreBtn.addEventListener('click', () => {
    game.resetScores();
    controller.updateScoreBoard();
})

gameBoardDOM.addEventListener('click', e => {

    let element = null;
    // if clicked on span , div
    if(e.target.classList.contains('cell-value')) {
        element = e.target.parentNode;
    } else if (e.target.classList.contains('game-board-cell')) {
        element = e.target;
    }

    if(element && !element.classList.contains('disabled')) {

        game.playRound(+element.getAttribute('data-cell'));
        controller.drawBoard();

        if(game.checkGameOver()) {
            gameStartBtn.disabled = false;
            controller.disableFields();
            if(game.getWinner().winner) {
                controller.updateScoreBoard()
            }
        }
    }
});



gameStartBtn.addEventListener('click', (e) => {
    gameStartBtn.disabled = true;
    game.initGame();
    controller.enableFields();
    controller.updateScoreBoard();
    controller.drawBoard(game.getBoard());
});






// export {createGame};

// game finished:
    // score management
    // disable fields
    // winner message
    // line marking winnner if not draw
    // activate button to start new game

// game start:
    // disable start button
    // init game