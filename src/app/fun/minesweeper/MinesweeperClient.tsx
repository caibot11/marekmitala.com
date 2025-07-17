"use client";

import { useState, useEffect, useCallback } from "react";
import Confetti from "react-confetti";
import styles from "./minesweeper.module.css";

type Difficulty = "beginner" | "intermediate" | "expert";

type Cell = {
  isMine: boolean;
  adjacentMines: number;
  isRevealed: boolean;
  isFlagged: boolean;
};

type GameState = "playing" | "won" | "lost";

type Mode = 'dig' | 'flag';

export default function MinesweeperClient() {
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [rows, setRows] = useState(9);
  const [cols, setCols] = useState(9);
  const [mines, setMines] = useState(10);
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [flagsUsed, setFlagsUsed] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
  const [mode, setMode] = useState<Mode>('dig');

  useEffect(() => {
    function updatePageSize() {
      const body = document.body;
      const html = document.documentElement;
      const width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
      const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      setPageSize({ width, height });
    }
    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const startNewGame = useCallback((newDifficulty: Difficulty) => {
    let newRows, newCols, newMines;
    switch (newDifficulty) {
      case "beginner":
        newRows = 9;
        newCols = 9;
        newMines = 10;
        break;
      case "intermediate":
        newRows = 16;
        newCols = 16;
        newMines = 40;
        break;
      case "expert":
        newRows = 16;
        newCols = 30;
        newMines = 99;
        break;
    }
    setDifficulty(newDifficulty);
    setRows(newRows);
    setCols(newCols);
    setMines(newMines);
    setBoard(generateBoard(newRows, newCols, newMines));
    setGameState("playing");
    setTimer(0);
    setIsPaused(false);
    setFlagsUsed(0);
    setShowConfetti(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    startNewGame(difficulty);
  }, [difficulty, startNewGame]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (gameState === "playing" && !isPaused) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState, isPaused]);

  const generateBoard = (rows: number, cols: number, mines: number): Cell[][] => {
    const board: Cell[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        isMine: false,
        adjacentMines: 0,
        isRevealed: false,
        isFlagged: false,
      }))
    );

    // Place mines
    let placedMines = 0;
    while (placedMines < mines) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (!board[r][c].isMine) {
        board[r][c].isMine = true;
        placedMines++;
      }
    }

    // Calculate adjacent mines
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!board[r][c].isMine) {
          board[r][c].adjacentMines = countAdjacentMines(board, r, c, rows, cols);
        }
      }
    }

    return board;
  };

  const countAdjacentMines = (board: Cell[][], r: number, c: number, rows: number, cols: number): number => {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
          count++;
        }
      }
    }
    return count;
  };

  const revealCell = (r: number, c: number) => {
    if (gameState !== "playing" || board[r][c].isRevealed || board[r][c].isFlagged) return;

    const newBoard = board.map(row => row.slice());
    newBoard[r][c].isRevealed = true;

    if (newBoard[r][c].isMine) {
      setGameState("lost");
      setIsPaused(true);
      // Reveal all mines
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (newBoard[i][j].isMine) {
            newBoard[i][j].isRevealed = true;
          }
        }
      }
      setBoard(newBoard);
      return;
    }

    if (newBoard[r][c].adjacentMines === 0) {
      floodFill(newBoard, r, c);
    }

    setBoard(newBoard);
    checkWin(newBoard);
  };

  const toggleFlag = (r: number, c: number) => {
    if (board[r][c].isRevealed) return;

    const newBoard = board.map(row => row.slice());
    newBoard[r][c].isFlagged = !newBoard[r][c].isFlagged;
    setFlagsUsed((prev) => prev + (newBoard[r][c].isFlagged ? 1 : -1));
    setBoard(newBoard);
    checkWin(newBoard);
  };

  const handleContextMenu = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameState !== "playing" || isPaused || board[r][c].isRevealed) return;
    toggleFlag(r, c);
  };

  const chord = (r: number, c: number) => {
    if (!board[r][c].isRevealed || board[r][c].adjacentMines === 0) return;

    let adjacentFlags = 0;
    getAdjacentCells(r, c).forEach(([nr, nc]) => {
      if (board[nr][nc].isFlagged) adjacentFlags++;
    });

    if (adjacentFlags !== board[r][c].adjacentMines) return;

    const newBoard = board.map(row => row.slice());
    let lost = false;

    getAdjacentCells(r, c).forEach(([nr, nc]) => {
      if (!newBoard[nr][nc].isRevealed && !newBoard[nr][nc].isFlagged) {
        newBoard[nr][nc].isRevealed = true;
        if (newBoard[nr][nc].isMine) {
          lost = true;
        } else if (newBoard[nr][nc].adjacentMines === 0) {
          floodFill(newBoard, nr, nc);
        }
      }
    });

    if (lost) {
      setGameState("lost");
      setIsPaused(true);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (newBoard[i][j].isMine) newBoard[i][j].isRevealed = true;
        }
      }
    }

    setBoard(newBoard);
    if (!lost) checkWin(newBoard);
  };

  const handleCellClick = (r: number, c: number) => {
    if (gameState !== "playing" || isPaused) return;

    if (mode === 'dig') {
      if (board[r][c].isRevealed) {
        chord(r, c);
      } else if (!board[r][c].isFlagged) {
        revealCell(r, c);
      }
    } else { // flag mode
      toggleFlag(r, c);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'dig' ? 'flag' : 'dig'));
  };

  const getAdjacentCells = (r: number, c: number): [number, number][] => {
    const adjacent: [number, number][] = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          adjacent.push([nr, nc]);
        }
      }
    }
    return adjacent;
  };

  const floodFill = (currentBoard: Cell[][], r: number, c: number) => {
    const stack = [[r, c]];
    while (stack.length > 0) {
      const [cr, cc] = stack.pop()!;
      getAdjacentCells(cr, cc).forEach(([nr, nc]) => {
        if (!currentBoard[nr][nc].isRevealed && !currentBoard[nr][nc].isFlagged && !currentBoard[nr][nc].isMine) {
          currentBoard[nr][nc].isRevealed = true;
          if (currentBoard[nr][nc].adjacentMines === 0) {
            stack.push([nr, nc]);
          }
        }
      });
    }
  };

  const checkWin = (currentBoard: Cell[][]) => {
    let allNonMinesRevealed = true;
    let correctFlags = true;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!currentBoard[i][j].isMine && !currentBoard[i][j].isRevealed) {
          allNonMinesRevealed = false;
        }
        if (currentBoard[i][j].isMine && !currentBoard[i][j].isFlagged) {
          correctFlags = false;
        }
        if (!currentBoard[i][j].isMine && currentBoard[i][j].isFlagged) {
          correctFlags = false;
        }
      }
    }
    if (allNonMinesRevealed && correctFlags) {
      setGameState("won");
      setShowConfetti(true);
      setIsPaused(true);
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const getCellContent = (cell: Cell) => {
    if (!cell.isRevealed) {
      return cell.isFlagged ? "🚩" : "";
    }
    if (cell.isMine) {
      return "💣";
    }
    return cell.adjacentMines > 0 ? cell.adjacentMines : "";
  };

  const getCellClass = (cell: Cell) => {
    if (!cell.isRevealed) return styles.unrevealed;
    if (cell.isMine) return styles.mine;
    return `${styles.revealed} ${styles[`num${cell.adjacentMines}`]}`;
  };

  const boardStyle = {
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
  };

  return (
    <div className={styles.container}>
      {showConfetti && <Confetti width={pageSize.width} height={pageSize.height} />}
      <h1 className={styles.title}>Minesweeper</h1>
      <div className={styles.infoPanel}>
        <div className={styles.timer}>Time: {new Date(timer * 1000).toISOString().substr(14, 5)}</div>
        <div className={styles.flags}>Flags: {flagsUsed} / {mines}</div>
      </div>
      <div className={styles.controls}>
        <button className={styles.difficultyButton} onClick={() => startNewGame("beginner")}>Beginner</button>
        <button className={styles.difficultyButton} onClick={() => startNewGame("intermediate")}>Intermediate</button>
        <button className={styles.difficultyButton} onClick={() => startNewGame("expert")}>Expert</button>
        <button className={styles.pauseButton} onClick={handlePause}>
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button className={styles.modeButton} onClick={toggleMode}>
          Mode: {mode === 'dig' ? 'Dig' : 'Flag'}
        </button>
      </div>
      {gameState === "won" && <div className={styles.message}>You Won!</div>}
      {gameState === "lost" && <div className={styles.message}>Game Over!</div>}
      <div className={styles.board} style={boardStyle}>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className={`${styles.cell} ${getCellClass(cell)}`}
              onClick={() => handleCellClick(r, c)}
              onContextMenu={(e) => handleContextMenu(e, r, c)}
            >
              {getCellContent(cell)}
            </div>
          ))
        )}
      </div>
    </div>
  );
} 