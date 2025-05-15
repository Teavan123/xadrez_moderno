// GameContext.tsx
'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

// Tipos
interface Piece {
  type: string; // Ex: 'pawn', 'rook', etc.
  color: 'white' | 'black';
}

interface GameState {
  score: number;
  isPlaying: boolean;
  board: (Piece | null)[][];
  selected: { row: number; col: number } | null;
  validMoves: { row: number; col: number }[];
  turn: 'white' | 'black';
  boardWidth: number;
  boardHeight: number;
  winner: 'white' | 'black' | null;
}

type BoardSize = '6x6' | '6x8' | '6x12' | '12x12' | '10x7' | '8x8';

type GameAction =
  | { type: 'START_GAME'; payload: { size: BoardSize } }
  | { type: 'END_GAME' }
  | { type: 'UPDATE_SCORE'; payload: number }
  | { type: 'SELECT_PIECE'; payload: { row: number; col: number } | null }
  | { type: 'SET_VALID_MOVES'; payload: { row: number; col: number }[] }
  | { type: 'MOVE_PIECE'; payload: { to: { row: number; col: number } } };

// Função para criar o tabuleiro inicial
const createInitialBoard = (size: BoardSize): (Piece | null)[][] => {
  const [height, width] = size.split('x').map(Number);
  const board: (Piece | null)[][] = Array.from({ length: height }, () => Array(width).fill(null));

  // Configuração específica para cada tamanho
  switch (size) {
    case '8x8':
      // Configuração padrão do xadrez
      // Peças pretas no topo
      board[0][0] = { type: 'rook', color: 'black' };
      board[0][1] = { type: 'knight', color: 'black' };
      board[0][2] = { type: 'bishop', color: 'black' };
      board[0][3] = { type: 'queen', color: 'black' };
      board[0][4] = { type: 'king', color: 'black' };
      board[0][5] = { type: 'bishop', color: 'black' };
      board[0][6] = { type: 'knight', color: 'black' };
      board[0][7] = { type: 'rook', color: 'black' };
      // Peões pretos
      for (let i = 0; i < 8; i++) {
        board[1][i] = { type: 'pawn', color: 'black' };
      }
      // Peças brancas na base
      board[7][0] = { type: 'rook', color: 'white' };
      board[7][1] = { type: 'knight', color: 'white' };
      board[7][2] = { type: 'bishop', color: 'white' };
      board[7][3] = { type: 'queen', color: 'white' };
      board[7][4] = { type: 'king', color: 'white' };
      board[7][5] = { type: 'bishop', color: 'white' };
      board[7][6] = { type: 'knight', color: 'white' };
      board[7][7] = { type: 'rook', color: 'white' };
      // Peões brancos
      for (let i = 0; i < 8; i++) {
        board[6][i] = { type: 'pawn', color: 'white' };
      }
      break;

    case '6x6':
    case '6x8':
    case '6x12':
      // Peças pretas no topo
      board[0][0] = { type: 'rook', color: 'black' };
      board[0][1] = { type: 'knight', color: 'black' };
      board[0][2] = { type: 'bishop', color: 'black' };
      board[0][3] = { type: 'queen', color: 'black' };
      board[0][4] = { type: 'king', color: 'black' };
      board[0][5] = { type: 'bishop', color: 'black' };
      if (width > 6) {
        board[0][6] = { type: 'knight', color: 'black' };
        board[0][7] = { type: 'rook', color: 'black' };
      }
      // Peões pretos
      for (let i = 0; i < width; i++) {
        board[1][i] = { type: 'pawn', color: 'black' };
      }
      // Peças brancas na base
      board[height-1][0] = { type: 'rook', color: 'white' };
      board[height-1][1] = { type: 'knight', color: 'white' };
      board[height-1][2] = { type: 'bishop', color: 'white' };
      board[height-1][3] = { type: 'queen', color: 'white' };
      board[height-1][4] = { type: 'king', color: 'white' };
      board[height-1][5] = { type: 'bishop', color: 'white' };
      if (width > 6) {
        board[height-1][6] = { type: 'knight', color: 'white' };
        board[height-1][7] = { type: 'rook', color: 'white' };
      }
      // Peões brancos
      for (let i = 0; i < width; i++) {
        board[height-2][i] = { type: 'pawn', color: 'white' };
      }
      break;

    case '12x12':
    case '10x7':
      // Configuração similar mas com mais espaço
      board[0][0] = { type: 'rook', color: 'black' };
      board[0][1] = { type: 'knight', color: 'black' };
      board[0][2] = { type: 'bishop', color: 'black' };
      board[0][3] = { type: 'queen', color: 'black' };
      board[0][4] = { type: 'king', color: 'black' };
      board[0][5] = { type: 'bishop', color: 'black' };
      board[0][6] = { type: 'knight', color: 'black' };
      board[0][7] = { type: 'rook', color: 'black' };
      for (let i = 0; i < width; i++) {
        board[1][i] = { type: 'pawn', color: 'black' };
      }
      board[height-1][0] = { type: 'rook', color: 'white' };
      board[height-1][1] = { type: 'knight', color: 'white' };
      board[height-1][2] = { type: 'bishop', color: 'white' };
      board[height-1][3] = { type: 'queen', color: 'white' };
      board[height-1][4] = { type: 'king', color: 'white' };
      board[height-1][5] = { type: 'bishop', color: 'white' };
      board[height-1][6] = { type: 'knight', color: 'white' };
      board[height-1][7] = { type: 'rook', color: 'white' };
      for (let i = 0; i < width; i++) {
        board[height-2][i] = { type: 'pawn', color: 'white' };
      }
      break;
  }

  return board;


  return board;
};

// Estado inicial
const initialState: GameState = {
  score: 0,
  isPlaying: false,
  board: createInitialBoard('6x6'),
  selected: null,
  validMoves: [],
  turn: 'white',
  boardWidth: 8,
  boardHeight: 8,
  winner: null,
};

// Reducer
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME': {
      const [height, width] = action.payload.size.split('x').map(Number);
      return {
        ...state,
        isPlaying: true,
        board: createInitialBoard(action.payload.size),
        selected: null,
        validMoves: [],
        turn: 'white',
        boardWidth: width,
        boardHeight: height,
        winner: null,
      };
    }
    case 'END_GAME':
      return { ...state, isPlaying: false, selected: null, validMoves: [] };
    case 'UPDATE_SCORE':
      return { ...state, score: state.score + action.payload };
    case 'SELECT_PIECE':
      return { ...state, selected: action.payload };
    case 'SET_VALID_MOVES':
      return { ...state, validMoves: action.payload };
    case 'MOVE_PIECE': {
      if (!state.selected) return state;
      const { row, col } = state.selected;
      const { to } = action.payload;

      // Cria um novo tabuleiro
      const newBoard = state.board.map(r => [...r]);
      
      // Pega a peça que está se movendo
      const movingPiece = state.board[row][col];
      if (!movingPiece) return state;
      
      // Guarda a peça que está sendo capturada (se houver)
      const capturedPiece = state.board[to.row][to.col];
      
      // Faz o movimento
      newBoard[row][col] = null; // Remove a peça da posição original
      newBoard[to.row][to.col] = movingPiece; // Coloca a peça na nova posição

      // Atualiza o score se uma peça foi capturada
      let newScore = state.score;
      if (capturedPiece) {
        newScore += capturedPiece.color === 'black' ? 1 : -1;
      }

      // Verifica se um rei foi capturado
      let winner = null;
      if (capturedPiece?.type === 'king') {
        winner = movingPiece.color; // A cor que capturou o rei vence
      }

      return {
        ...state,
        board: newBoard,
        selected: null,
        validMoves: [],
        turn: state.turn === 'white' ? 'black' : 'white',
        score: newScore,
        winner,
        isPlaying: winner === null // O jogo continua apenas se não houver vencedor
      };
    }
    default:
      return state;
  }
};

// Contexto
const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | undefined>(undefined);

// Provider
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

// Hook personalizado
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};