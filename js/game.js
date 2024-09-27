function createBoard() {

    const GAME_FIELDS = 9;
    const MARKERS = ['X','O'];
    let field = Array.from({length: GAME_FIELDS}, val => false);
    // winner mark or empty if draw
    let winner = '';

    function addMarker(cell, marker) {
        let success = false;

        if(!field[cell] && marker && MARKERS.includes(marker.toUpperCase())) {
            field[cell] = marker;
            success = true;
        }
        return success;
    }

    function checkGameOver() {
        let isGameOver = false;
        // board is completely occupied

        // cell unoccupied means cell === false else true
        isGameOver = field.reduce((acc, val) => acc = acc && val? true : false ,true);

        if(!isGameOver) {
            const winningCriteria = [
                field[0] && field[0] === field[1] && field[0] === field[2],
                field[3] && field[3] === field[4] && field[3] === field[5],
                field[6] && field[6] === field[7] && field[6] === field[8],
                field[0] && field[0] === field[3] && field[0] === field[6],
                field[1] && field[1] === field[4] && field[1] === field[7],
                field[2] && field[2] === field[5] && field[2] === field[8],
                field[0] && field[0] === field[4] && field[0] === field[8],
                field[6] && field[6] === field[4] && field[6] === field[2],
            ]
            winningCriteria.forEach(x => isGameOver = isGameOver || x);
        }
            
        // winning criteria is met
        return isGameOver;
    }

    function getBoardPretty() {
        let prettyField = [...field].map(val => val? val : '_'); // iterator workaround for accessing empty array elements
        return prettyField.reduce((acc, val, idx) => acc + (idx % 3 === 0 ? `\n${val} ` : `${val} `), '')
    }

    function displayPretty() {
        console.log(getBoardPretty());
    }

    function getWinner() {
        return winner;
    }

    function resetField() {
        field.forEach((_, idx) => field[idx] = false);
    }

    return {
        addMarker,
        getWinner,
        checkGameOver,
        displayPretty,
        resetField,
    };
}


function createPlayer(name, marker) {
    let score = 0;

    function getScore() {
        return score;
    }
    function setScore(val) {
        score = val;
    }

    return {
        name,
        marker,
        getScore,
        setScore,
    };
}

let i = true;

function sum(a, b) {
    return a + b;
}

export {createBoard, sum, i};