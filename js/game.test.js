import {createGame} from './game'



describe('Check if game is over', () => {
    // Applies only to tests in this describe block
    let game = createGame('','');

    beforeEach(() => {
        game.getBoard().resetField()
    });
  
    test('Field full', () => {
      game.getBoard().addMarker(0, 'X');
      game.getBoard().addMarker(1, 'O');
      game.getBoard().addMarker(2, 'X');
      game.getBoard().addMarker(3, 'X');
      game.getBoard().addMarker(4, 'O');
      game.getBoard().addMarker(5, 'O');
      game.getBoard().addMarker(6, 'O');
      game.getBoard().addMarker(7, 'X');
      game.getBoard().addMarker(8, 'X');
      game.getBoard().addMarker(9, 'X');

      expect(game.checkGameOver()).toBe(true);
      expect(game.getWinner()).toEqual({});
      expect(game.getBoard().isFreeSpaceAvailable()).toBe(false);
    });

    test('1st row', () => {
      game.getBoard().addMarker(0, 'X');
      game.getBoard().addMarker(1, 'X');
      game.getBoard().addMarker(2, 'X');
      expect(game.checkGameOver()).toBe(true);
      expect(game.getWinner().winner.getMarker()).toBe('X');
      expect(game.getWinner().cells.sort()).toEqual([0,1,2].sort());
    });
    test('2nd row', () => {
      game.getBoard().addMarker(3, 'O');
      game.getBoard().addMarker(4, 'O');
      game.getBoard().addMarker(5, 'O');
      expect(game.checkGameOver()).toBe(true);
      expect(game.getWinner().winner.getMarker()).toBe('O');
      expect(game.getWinner().cells.sort()).toEqual([4,5,3].sort());
    });
    test('3rd row', () => {
      game.getBoard().addMarker(6, 'X');
      game.getBoard().addMarker(7, 'X');
      game.getBoard().addMarker(8, 'X');
      expect(game.checkGameOver()).toBe(true);
      expect(game.getWinner().winner.getMarker()).toBe('X');
      expect(game.getWinner().cells.sort()).toEqual([8,7,6].sort());
    });
    test('1st column', () => {
      game.getBoard().addMarker(0, 'X');
      game.getBoard().addMarker(3, 'X');
      game.getBoard().addMarker(6, 'X');
      expect(game.checkGameOver()).toBe(true);
      expect(game.getWinner().winner.getMarker()).toBe('X');
      expect(game.getWinner().cells.sort()).toEqual([0,3,6].sort());
    });
    test('2nd column', () => {
      game.getBoard().addMarker(1, 'X');
      game.getBoard().addMarker(4, 'X');
      game.getBoard().addMarker(7, 'X');
      expect(game.checkGameOver()).toBe(true);
      expect(game.getWinner().winner.getMarker()).toBe('X');
      expect(game.getWinner().cells.sort()).toEqual([4,1,7].sort());
    });
    test('3rd column', () => {
      game.getBoard().addMarker(2, 'O');
      game.getBoard().addMarker(5, 'O');
      game.getBoard().addMarker(8, 'O');
      expect(game.checkGameOver()).toBe(true);
      expect(game.getWinner().winner.getMarker()).toBe('O');
      expect(game.getWinner().cells.sort()).toEqual([8,5,2].sort());
    });
    test('1st row no win', () => {
      game.getBoard().addMarker(0, 'X');
      game.getBoard().addMarker(1, 'X');
      game.getBoard().addMarker(2, 'O');
      expect(game.checkGameOver()).toBe(false);
      expect(game.getWinner()).toEqual({});
    });
    test('empty field', () => {
        expect(game.checkGameOver()).toBe(false);
        expect(game.getWinner()).toEqual({});
    });

});



describe('Check Interaction', () => {
    // Applies only to tests in this describe block
    const game = createGame('', '')
    const board = game.getBoard();

    beforeEach(() => {
        board.resetField()
    });
  
    test('Add markers case insensitive', () => {
      board.addMarker(0, 'X');
      board.addMarker(1, 'O');
      board.addMarker(2, 'X');
      board.addMarker(3, 'x');
      board.addMarker(4, 'o');

      expect(board.getField(0)).toBe('X');
      expect(board.getField(1)).toBe('O');
      expect(board.getField(2)).toBe('X');
      expect(board.getField(3)).toBe('X');
      expect(board.getField(4)).toBe('O');
    });

    test('Add invalid markers', () => {
      board.addMarker(0, 'X');
      board.addMarker(1, 'P');
      board.addMarker(2, 'X');

      expect(board.getField(1)).toBe(false);
    });

    test('Get field out of range', () => {
      expect(board.getField(-1)).toBeUndefined();
      expect(board.getField(-9)).toBeUndefined();
    });

    test('Add markers on occupied field', () => {
        board.addMarker(0, 'X');
        expect(board.addMarker(0, 'O')).toBe(false);
        expect(board.getField(0)).toBe('X');
      });

});


describe('Check Player logic', () => {
    

    test('Get functions', () => {
        const name1 = 'P1';
        const name2 = 'P2';

        const game = createGame(name1, name2);

        const player1 = game.getPlayer(0);
        const player2 = game.getPlayer(1);
        expect(player1.getName()).toBe(name1);
        expect(player1.getMarker()).toBe('X');
        expect(player1.getScore()).toBe(0);
        expect(player2.getName()).toBe(name2);
        expect(player2.getMarker()).toBe('O');
        expect(player2.getScore()).toBe(0);
    });


    test('Set functions', () => {
        const name1 = 'P1';
        const name2 = 'P2';
        const game = createGame(name1, name2);
        const player1 = game.getPlayer(0);
        player1.setScore(3);
        expect(player1.getScore()).toBe(3);
        player1.setScore(player1.getScore()+1);
        expect(player1.getScore()).toBe(4);
    });

});


describe('Check Game logic', () => {
    // Applies only to tests in this describe block
    const game =  createGame('MrX', 'MrY');
    beforeEach(() => {
        game.initGame();
        game.resetScores();
    });

    test('Player turns alternate', () => {
        expect(game.getActivePlayer()).toEqual(game.getPlayer(0));
        game.playRound(0);
        expect(game.getActivePlayer()).toEqual(game.getPlayer(1));
    });

    test('Player winner score increment', () => {
        game.playRound(0);
        game.playRound(3);
        game.playRound(1);
        game.playRound(4);
        game.playRound(2);

        expect(game.getScores()).toEqual([1,0]);
        game.initGame();
        game.playRound(0);
        game.playRound(3);
        game.playRound(1);
        game.playRound(4);
        game.playRound(6);
        game.playRound(5);

        expect(game.getScores()).toEqual([1,1]);
    });
    test('Draw', () => {
        // X O X
        // X X O
        // O X O
        game.playRound(0);
        game.playRound(1);

        game.playRound(2);
        game.playRound(8);

        game.playRound(4);
        game.playRound(5);

        game.playRound(7);
        game.playRound(6);

        game.playRound(3);

        expect(game.getScores()).toEqual([0,0]);
 
    });

    test('Reset game scores', () => {
        game.playRound(0);
        game.playRound(3);
        game.playRound(1);
        game.playRound(4);
        game.playRound(2);

        expect(game.getScores()).toEqual([1,0]);
        game.resetScores();
        expect(game.getScores()).toEqual([0,0]);
        
    });

    test('Init game', () => {
        game.playRound(0);
        game.initGame();
        expect(game.getActivePlayer()).toEqual(game.getPlayer(0));
        expect(game.getBoard().getField(0)).toBe(false);
    });

});
