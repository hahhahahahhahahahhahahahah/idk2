import { Board, Piece, Position, PieceType } from '../types/chess';

export const createInitialBoard = (): Board => {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Initialize pawns
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: 'pawn', color: 'black' };
    board[6][i] = { type: 'pawn', color: 'white' };
  }

  // Initialize other pieces
  const pieceOrder: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  
  for (let i = 0; i < 8; i++) {
    board[0][i] = { type: pieceOrder[i], color: 'black' };
    board[7][i] = { type: pieceOrder[i], color: 'white' };
  }

  return board;
};

export const isValidMove = (
  board: Board,
  from: Position,
  to: Position,
  piece: Piece
): boolean => {
  const dx = Math.abs(to.col - from.col);
  const dy = Math.abs(to.row - from.row);
  
  // Basic movement validation
  switch (piece.type) {
    case 'pawn':
      const direction = piece.color === 'white' ? -1 : 1;
      const startRow = piece.color === 'white' ? 6 : 1;
      
      // Forward movement
      if (from.col === to.col && !board[to.row][to.col]) {
        if (to.row - from.row === direction) return true;
        if (from.row === startRow && to.row - from.row === 2 * direction && !board[from.row + direction][from.col]) return true;
      }
      
      // Capture
      if (Math.abs(to.col - from.col) === 1 && to.row - from.row === direction) {
        const targetPiece = board[to.row][to.col];
        if (targetPiece && targetPiece.color !== piece.color) return true;
      }
      return false;

    case 'knight':
      return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);

    case 'bishop':
      return dx === dy;

    case 'rook':
      return dx === 0 || dy === 0;

    case 'queen':
      return dx === dy || dx === 0 || dy === 0;

    case 'king':
      return dx <= 1 && dy <= 1;

    default:
      return false;
  }
};