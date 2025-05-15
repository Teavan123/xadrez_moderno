// src/app/page.tsx
'use client';

import styles from './page.module.css';
import GameBoard from '../components/GameBoard';
import { GameProvider } from '../components/GameContext';

export default function Home() {
  return (
    <div className={styles.container}>
      <GameProvider>
        <GameBoard />
      </GameProvider>
    </div>
  );
}