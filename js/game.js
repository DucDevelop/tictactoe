function createBoard() {
    const GAME_FIELDS = 9;
    const MARKERS = ['X','O'];
    let field = Array(GAME_FIELDS);
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



    return {
        field,
        addMarker,
        getWinner,
        checkGameOver,
        displayPretty,
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