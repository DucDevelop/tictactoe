import {createBoard, createPlayer} from './game'

const board = createBoard();


describe('Check if game is over', () => {
    // Applies only to tests in this describe block
    beforeEach(() => {
        board.resetField()
    });
  
    test('Field full', () => {
      board.addMarker(0, 'X');
      board.addMarker(1, 'O');
      board.addMarker(2, 'X');
      board.addMarker(3, 'X');
      board.addMarker(4, 'O');
      board.addMarker(5, 'O');
      board.addMarker(6, 'O');
      board.addMarker(7, 'X');
      board.addMarker(8, 'X');
      board.addMarker(9, 'X');

      expect(board.checkGameOver()).toBe(true);
      expect(board.getWinner()).toBe('');
      expect(board.isFreeSpaceAvailable()).toBe(false);
    });
    test('1st row', () => {
      board.addMarker(0, 'X');
      board.addMarker(1, 'X');
      board.addMarker(2, 'X');
      expect(board.checkGameOver()).toBe(true);
      expect(board.getWinner()).toBe('X');
    });
    test('2nd row', () => {
      board.addMarker(3, 'O');
      board.addMarker(4, 'O');
      board.addMarker(5, 'O');
      expect(board.checkGameOver()).toBe(true);
      expect(board.getWinner()).toBe('O');
    });
    test('3rd row', () => {
      board.addMarker(6, 'X');
      board.addMarker(7, 'X');
      board.addMarker(8, 'X');
      expect(board.checkGameOver()).toBe(true);
      expect(board.getWinner()).toBe('X');
    });
    test('1st column', () => {
      board.addMarker(0, 'X');
      board.addMarker(3, 'X');
      board.addMarker(6, 'X');
      expect(board.checkGameOver()).toBe(true);
      expect(board.getWinner()).toBe('X');
    });
    test('2nd column', () => {
      board.addMarker(1, 'X');
      board.addMarker(4, 'X');
      board.addMarker(7, 'X');
      expect(board.checkGameOver()).toBe(true);
      expect(board.getWinner()).toBe('X');
    });
    test('3rd column', () => {
      board.addMarker(2, 'O');
      board.addMarker(5, 'O');
      board.addMarker(8, 'O');
      expect(board.checkGameOver()).toBe(true);
      expect(board.getWinner()).toBe('O');
    });
    test('1st row no win', () => {
      board.addMarker(0, 'X');
      board.addMarker(1, 'X');
      board.addMarker(2, 'O');
      expect(board.checkGameOver()).toBe(false);
      expect(board.getWinner()).toBe('');
    });
    test('empty field', () => {
      expect(board.checkGameOver()).toBe(false);
      expect(board.getWinner()).toBe('');
    });

});



describe('Check Interaction', () => {
    // Applies only to tests in this describe block
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
        const name = 'P1';
        const marker = false
        const player1 = createPlayer(name, marker);
        expect(player1.getName()).toBe(name);
        expect(player1.getMarker()).toBe('O');
        expect(player1.getScore()).toBe(0);
    });
    test('Default marker', () => {
        const name = 'P1';
        const player1 = createPlayer(name);
        expect(player1.getMarker()).toBe('X');
    });
    test('O marker marker', () => {
        const name = 'P1';
        const markerX = false
        const player1 = createPlayer(name, markerX);
        expect(player1.getMarker()).toBe('O');
    });

    test('Set functions', () => {
        const name = 'P1';
        const player1 = createPlayer(name);
        player1.setScore(3);
        expect(player1.getScore()).toBe(3);
        player1.setScore(player1.getScore()+1);
        expect(player1.getScore()).toBe(4);
    });

});


describe('Check Game logic', () => {
    // Applies only to tests in this describe block
    beforeEach(() => {
        board.resetField()
    });

    test('Get field out of range', () => {
      expect(board.getField(-1)).toBeUndefined();
      expect(board.getField(-9)).toBeUndefined();
    });

});
