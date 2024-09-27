import {createBoard, i, sum} from './game'

const board = createBoard();

describe('Check if game is over', () => {
    // Applies only to tests in this describe block
    beforeEach(() => {
        board.resetField()
    });
  
    test('Field full', () => {
      board.addMarker(0, 'X');
      board.addMarker(1, 'X');
      board.addMarker(2, 'X');
      board.addMarker(3, 'X');
      board.addMarker(4, 'X');
      board.addMarker(5, 'X');
      board.addMarker(6, 'X');
      board.addMarker(7, 'X');
      board.addMarker(8, 'X');
      board.addMarker(9, 'X');

      expect(board.checkGameOver()).toBe(true);
    });
    test('1st row', () => {
      board.addMarker(0, 'X');
      board.addMarker(1, 'X');
      board.addMarker(2, 'X');
      expect(board.checkGameOver()).toBe(true);
    });
    test('1st row no win', () => {
      board.addMarker(0, 'X');
      board.addMarker(1, 'X');
      board.addMarker(2, 'O');
      expect(board.checkGameOver()).toBe(false);
    });

});

