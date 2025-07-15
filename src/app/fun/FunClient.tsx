"use client";

import { useState } from "react";
import SudokuClient from "./sudoku/SudokuClient";
import MinesweeperClient from "./minesweeper/MinesweeperClient";
import styles from "./fun.module.css";

type Game = "sudoku" | "minesweeper" | null;

export default function FunClient() {
  const [selectedGame, setSelectedGame] = useState<Game>(null);

  const handleGoBack = () => {
    setSelectedGame(null);
  };

  if (selectedGame === "sudoku") {
    return (
      <div>
        <button onClick={handleGoBack} className={styles.backButton}>
          Back to Games
        </button>
        <SudokuClient />
      </div>
    );
  }

  if (selectedGame === "minesweeper") {
    return (
      <div>
        <button onClick={handleGoBack} className={styles.backButton}>
          Back to Games
        </button>
        <MinesweeperClient />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Choose a Game</h1>
      <div className={styles.gameSelection}>
        <button
          className={styles.gameButton}
          onClick={() => setSelectedGame("sudoku")}
        >
          Sudoku
        </button>
        <button
          className={styles.gameButton}
          onClick={() => setSelectedGame("minesweeper")}
        >
          Minesweeper
        </button>
      </div>
    </div>
  );
} 