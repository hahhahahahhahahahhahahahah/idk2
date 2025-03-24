import React, { useState } from 'react';
import { Board, Position, Piece } from '../types/chess';
import { createInitialBoard, isValidMove } from '../utils/chessLogic';
import { Crown, Circle } from 'lucide-react';

const ChessBoard: React.FC = () => {
  const [board, setBoard] = useState<Board>(createInitialBoard());
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');

  const handleSquareClick = (row: number, col: number) => {
    if (!selectedPosition) {
      const piece = board[row][col];
      if (piece && piece.color === currentPlayer) {
        setSelectedPosition({ row, col });
      }
    } else {
      const from = selectedPosition;
      const to = { row, col };
      const piece = board[from.row][from.col];

      if (piece && isValidMove(board, from, to, piece)) {
        const newBoard = board.map(row => [...row]);
        newBoard[to.row][to.col] = piece;
        newBoard[from.row][from.col] = null;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
      }
      setSelectedPosition(null);
    }
  };

  const renderPiece = (piece: Piece | null) => {
    if (!piece) return null;

    const color = piece.color === 'white' ? 'text-white' : 'text-black';
    
    switch (piece.type) {
      case 'king':
        return <Crown className={`w-8 h-8 ${color}`} />;
      case 'queen':
        return <Crown className={`w-8 h-8 ${color}`} />;
      case 'bishop':
        return <Circle className={`w-8 h-8 ${color}`} />;
      case 'knight':
        return <Circle className={`w-8 h-8 ${color}`} />;
      case 'rook':
        return <Circle className={`w-8 h-8 ${color}`} />;
      case 'pawn':
        return <Circle className={`w-6 h-6 ${color}`} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Chess Game</h1>
      <div className="text-white mb-4">Current Player: {currentPlayer}</div>
      <div className="grid grid-cols-8 gap-0 border-4 border-gray-700">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const isBlackSquare = (rowIndex + colIndex) % 2 === 1;
            const isSelected = selectedPosition?.row === rowIndex && selectedPosition?.col === colIndex;
            
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-16 h-16 flex items-center justify-center cursor-pointer
                  ${isBlackSquare ? 'bg-gray-700' : 'bg-gray-300'}
                  ${isSelected ? 'ring-4 ring-blue-500' : ''}
                  hover:opacity-90 transition-opacity
                `}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {renderPiece(piece)}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChessBoard;