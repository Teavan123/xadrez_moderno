import { GameProvider } from '@/components/GameContext';
import GameBoard from '@/components/GameBoard';
import styles from '../page.module.css';

export default function Jogo() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <GameProvider>
          <GameBoard />
        </GameProvider>
      </main>
    </div>
  );
} 