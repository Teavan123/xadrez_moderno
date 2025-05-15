// components/GameBoard.tsx
'use client';

import { useGame } from './GameContext';
import { useState } from 'react';
import styles from './GameBoard.module.css';

// Constantes do jogo
const BOARD_SIZES = ['8x8', '6x6', '6x8', '6x12', '12x12', '10x7'] as const;
const PIECE_VALUES = {
  pawn: 1,
  knight: 3,
  bishop: 3,
  rook: 5,
  queen: 9,
  king: Infinity
} as const;

// Tipos
type PieceType = keyof typeof PIECE_VALUES;
type PieceColor = 'white' | 'black';
type Position = { row: number; col: number };
type BoardSize = typeof BOARD_SIZES[number];

/**
 * Componente principal do tabuleiro de xadrez
 * Gerencia a renderização do tabuleiro, movimentação das peças
 * e interação do usuário
 */
const GameBoard = () => {
  const { state, dispatch } = useGame();
  const [selectedSize, setSelectedSize] = useState<BoardSize>('8x8');

  /**
   * Inicia um novo jogo com o tamanho de tabuleiro selecionado
   */
  const handleStartGame = () => {
    dispatch({ type: 'START_GAME', payload: { size: selectedSize } });
  };

  // Funções de movimentos para cada peça
  /**
   * Calcula todos os movimentos válidos para uma torre
   * @param row Linha atual da peça
   * @param col Coluna atual da peça
   * @param color Cor da peça (branca ou preta)
   * @returns Array de posições válidas para movimento
   */
  const getRookMoves = (row: number, col: number, color: PieceColor): Position[] => {
    const moves = [];
    // Movimento vertical para cima
    for (let i = row + 1; i < state.boardHeight; i++) {
      if (state.board[i][col]) {
        if (state.board[i][col]?.color !== color) {
          moves.push({ row: i, col });
        }
        break;
      }
      moves.push({ row: i, col });
    }
    // Movimento vertical para baixo
    for (let i = row - 1; i >= 0; i--) {
      if (state.board[i][col]) {
        if (state.board[i][col]?.color !== color) {
          moves.push({ row: i, col });
        }
        break;
      }
      moves.push({ row: i, col });
    }
    // Movimento horizontal para direita
    for (let j = col + 1; j < state.boardWidth; j++) {
      if (state.board[row][j]) {
        if (state.board[row][j]?.color !== color) {
          moves.push({ row, col: j });
        }
        break;
      }
      moves.push({ row, col: j });
    }
    // Movimento horizontal para esquerda
    for (let j = col - 1; j >= 0; j--) {
      if (state.board[row][j]) {
        if (state.board[row][j]?.color !== color) {
          moves.push({ row, col: j });
        }
        break;
      }
      moves.push({ row, col: j });
    }
    return moves;
  };

  const getBishopMoves = (row: number, col: number, color: 'white' | 'black') => {
    const moves = [];
    // Diagonal superior direita
    for (let i = 1; row + i < state.boardHeight && col + i < state.boardWidth; i++) {
      if (state.board[row + i][col + i]) {
        if (state.board[row + i][col + i]?.color !== color) {
          moves.push({ row: row + i, col: col + i });
        }
        break;
      }
      moves.push({ row: row + i, col: col + i });
    }
    // Diagonal superior esquerda
    for (let i = 1; row + i < state.boardHeight && col - i >= 0; i++) {
      if (state.board[row + i][col - i]) {
        if (state.board[row + i][col - i]?.color !== color) {
          moves.push({ row: row + i, col: col - i });
        }
        break;
      }
      moves.push({ row: row + i, col: col - i });
    }
    // Diagonal inferior direita
    for (let i = 1; row - i >= 0 && col + i < state.boardWidth; i++) {
      if (state.board[row - i][col + i]) {
        if (state.board[row - i][col + i]?.color !== color) {
          moves.push({ row: row - i, col: col + i });
        }
        break;
      }
      moves.push({ row: row - i, col: col + i });
    }
    // Diagonal inferior esquerda
    for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
      if (state.board[row - i][col - i]) {
        if (state.board[row - i][col - i]?.color !== color) {
          moves.push({ row: row - i, col: col - i });
        }
        break;
      }
      moves.push({ row: row - i, col: col - i });
    }
    return moves;
  };

  const getQueenMoves = (row: number, col: number, color: 'white' | 'black') => {
    return [...getRookMoves(row, col, color), ...getBishopMoves(row, col, color)];
  };

  const getKnightMoves = (row: number, col: number, color: 'white' | 'black') => {
    const moves = [];
    const possibleMoves = [
      [row + 2, col + 1], [row + 2, col - 1],
      [row - 2, col + 1], [row - 2, col - 1],
      [row + 1, col + 2], [row + 1, col - 2],
      [row - 1, col + 2], [row - 1, col - 2]
    ];

    for (const [r, c] of possibleMoves) {
      if (r >= 0 && r < state.boardHeight && c >= 0 && c < state.boardWidth) {
        if (!state.board[r][c] || state.board[r][c]?.color !== color) {
          moves.push({ row: r, col: c });
        }
      }
    }
    return moves;
  };

  const getKingMoves = (row: number, col: number, color: 'white' | 'black') => {
    const moves = [];
    for (let dx = -1; dx <= 1; dx++) { for (let dy = -1; dy <= 1; dy++) { if (dx === 0 && dy === 0) continue; const nx = row + dx, ny = col + dy; if (nx >= 0 && nx < state.boardHeight && ny >= 0 && ny < state.boardWidth) { if (!state.board[nx][ny] || state.board[nx][ny]?.color !== color) moves.push({ row: nx, col: ny }); } } }
    return moves;
  };

  const getPawnMoves = (row: number, col: number, color: 'white' | 'black') => {
    const moves = [];
    const direction = color === 'white' ? -1 : 1;
    const startRow = color === 'white' ? state.boardHeight - 2 : 1;

    // Movimento para frente
    if (row + direction >= 0 && row + direction < state.boardHeight) {
      if (!state.board[row + direction][col]) {
        moves.push({ row: row + direction, col });
        // Movimento duplo no início
        if (row === startRow && !state.board[row + 2 * direction][col]) {
          moves.push({ row: row + 2 * direction, col });
        }
      }
    }

    // Capturas diagonais
    const captures = [[row + direction, col - 1], [row + direction, col + 1]];
    for (const [r, c] of captures) {
      if (r >= 0 && r < state.boardHeight && c >= 0 && c < state.boardWidth) {
        if (state.board[r][c] && state.board[r][c]?.color !== color) {
          moves.push({ row: r, col: c });
        }
      }
    }
    return moves;
  };

  const isValidPosition = (row: number, col: number): boolean => {
    return row >= 0 && row < state.boardHeight && col >= 0 && col < state.boardWidth;
  };

  const handleSquareClick = (row: number, col: number) => {
    const piece = state.board[row][col];
    if (state.selected && state.validMoves.some(m => m.row === row && m.col === col)) {
      dispatch({ type: 'MOVE_PIECE', payload: { to: { row, col } } });
      return;
    }
    if (piece && piece.color === state.turn) {
      dispatch({ type: 'SELECT_PIECE', payload: { row, col } });
      let moves: { row: number; col: number }[] = [];
      switch (piece.type) {
        case 'pawn':
          moves = getPawnMoves(row, col, piece.color);
          break;
        case 'rook':
          moves = getRookMoves(row, col, piece.color);
          break;
        case 'knight':
          moves = getKnightMoves(row, col, piece.color);
          break;
        case 'bishop':
          moves = getBishopMoves(row, col, piece.color);
          break;
        case 'queen':
          moves = getQueenMoves(row, col, piece.color);
          break;
        case 'king':
          moves = getKingMoves(row, col, piece.color);
          break;
        default:
          moves = [];
      }
      dispatch({ type: 'SET_VALID_MOVES', payload: moves });
    } else {
      dispatch({ type: 'SELECT_PIECE', payload: null });
      dispatch({ type: 'SET_VALID_MOVES', payload: [] });
    }
  };

  const getColumns = (width: number) => {
    return Array.from({ length: width }, (_, i) => String.fromCharCode(97 + i));
  };

  const columns = getColumns(state.boardWidth);

  return (
    <div className={styles.gameBoard}>
      <div className={styles.header}>
        <h1>Jogo</h1>
        <div className={styles.score}>Pontuação: {state.score}</div>
      </div>

      {state.winner && (
        <div className={styles.gameOver}>
          <h2>Fim de Jogo!</h2>
          <p>{state.winner === 'white' ? 'Brancas' : 'Pretas'} venceram!</p>
          <button
            className={styles.startButton}
            onClick={() => dispatch({ type: 'START_GAME', payload: { size: selectedSize } })}
          >
            Jogar Novamente
          </button>
        </div>
      )}
      {!state.isPlaying && !state.winner ? (
        <div className={styles.startGame}>
          <div className={styles.dimensions}>
            <label>
              Dimensões do tabuleiro:
              <select 
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as BoardSize)}
                className={styles.select}
              >
                {BOARD_SIZES.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </label>
          </div>
          <button
            className={styles.startButton}
            onClick={handleStartGame}
          >
            Iniciar Jogo
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', marginLeft: 32, overflow: 'auto' }}>
            <div style={{ width: 24 }} />
            {columns.map((col) => (
              <div key={col} style={{ width: 48, textAlign: 'center', color: '#bdbdbd', fontWeight: 'bold' }}>{col}</div>
            ))}
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {Array.from({ length: state.boardHeight }).map((_, i) => (
                <div key={i} style={{ height: 48, color: '#bdbdbd', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24 }}>{8 - i}</div>
              ))}
            </div>
            <div 
              className={styles.board} 
              style={{ 
                position: 'relative',
                '--board-width': state.boardWidth,
                '--board-height': state.boardHeight
              } as React.CSSProperties}
            >
              {Array.from({ length: state.boardHeight }).map((_, row) =>
                Array.from({ length: state.boardWidth }).map((_, col) => {
                  const isLight = (row + col) % 2 === 0;
                  const piece = state.board[row][col];
                  let pieceEmoji = '';
                  if (piece) {
                    switch (piece.type) {
                      case 'pawn':
                        pieceEmoji = piece.color === 'white' ? '♙' : '♟'; // Usando variantes mais distintas dos peões
                        break;
                      case 'rook':
                        pieceEmoji = piece.color === 'white' ? '♖' : '♜';
                        break;
                      case 'knight':
                        pieceEmoji = piece.color === 'white' ? '♘' : '♞';
                        break;
                      case 'bishop':
                        pieceEmoji = piece.color === 'white' ? '♗' : '♝';
                        break;
                      case 'queen':
                        pieceEmoji = piece.color === 'white' ? '♕' : '♛';
                        break;
                      case 'king':
                        pieceEmoji = piece.color === 'white' ? '♔' : '♚';
                        break;
                      default:
                        pieceEmoji = '';
                    }
                  }
                  const isSelected = state.selected && state.selected.row === row && state.selected.col === col;
                  const isValidMove = state.validMoves.some(m => m.row === row && m.col === col);
                  const showMoveLine = isValidMove && state.selected;
                  return (
                    <div
                      key={`${row}-${col}`}
                      className={`${styles.square} ${isLight ? styles.light : styles.dark} ${
                      isSelected ? styles.selected : ''
                    } ${isValidMove ? styles.validMove : ''}`}
                      data-piece-color={piece?.color}
                      onClick={() => handleSquareClick(row, col)}
                      style={{ position: 'relative' }}
                    >
                      {pieceEmoji}
                      {showMoveLine && (
                        <div className={styles.moveLine} />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;