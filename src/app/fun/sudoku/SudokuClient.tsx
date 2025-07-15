"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import styles from "./sudoku.module.css";
import {
  generatePuzzle,
  getSolution,
  encryptSolution,
  decryptSolution,
} from "./sudokuGenerator";

export default function SudokuClient() {
  const [isClient, setIsClient] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [board, setBoard] = useState<number[][]>([]);
  const [userBoard, setUserBoard] = useState<number[][]>([]);
  const [notes, setNotes] = useState<string[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(""))
  );
  const [solutionHash, setSolutionHash] = useState<string>("");
  const [attempts, setAttempts] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [noteMode, setNoteMode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  // Add undo states
  const [history, setHistory] = useState<number[][][]>([]);

  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updatePageSize() {
      const body = document.body;
      const html = document.documentElement;

      const width = Math.max(
        body.scrollWidth,
        body.offsetWidth,
        html.clientWidth,
        html.scrollWidth,
        html.offsetWidth
      );

      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      setPageSize({ width, height });
    }

    updatePageSize();

    window.addEventListener("resize", updatePageSize);

    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  useEffect(() => {
    setIsClient(true);
    const savedBoard = localStorage.getItem("sudokuBoard");
    const savedUserBoard = localStorage.getItem("sudokuUserBoard");
    const savedNotes = localStorage.getItem("sudokuNotes");
    const savedDifficulty = localStorage.getItem("sudokuDifficulty");
    const savedSolutionHash = localStorage.getItem("sudokuSolutionHash");
    const savedAttempts = localStorage.getItem("sudokuAttempts");
    const savedTimer = localStorage.getItem("sudokuTimer");

    if (
      savedBoard &&
      savedUserBoard &&
      savedDifficulty &&
      savedSolutionHash &&
      savedAttempts
    ) {
      setBoard(JSON.parse(savedBoard));
      setUserBoard(JSON.parse(savedUserBoard));
      setNotes(
        savedNotes
          ? JSON.parse(savedNotes)
          : Array.from({ length: 9 }, () => Array(9).fill(""))
      );
      setDifficulty(savedDifficulty as "easy" | "medium" | "hard");
      setSolutionHash(encryptedSolution);
      setAttempts(parseInt(savedAttempts));
      setTimer(savedTimer ? parseInt(savedTimer) : 0);
    } else {
      startNewGame(difficulty);
    }
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("sudokuBoard", JSON.stringify(board));
      localStorage.setItem("sudokuUserBoard", JSON.stringify(userBoard));
      localStorage.setItem("sudokuNotes", JSON.stringify(notes));
      localStorage.setItem("sudokuDifficulty", difficulty);
      localStorage.setItem("sudokuSolutionHash", solutionHash);
      localStorage.setItem("sudokuAttempts", attempts.toString());
      localStorage.setItem("sudokuTimer", timer.toString());
    }
  }, [userBoard, notes, attempts, timer, isClient]);

  const startNewGame = (newDifficulty: "easy" | "medium" | "hard") => {
    const newBoard = generatePuzzle(newDifficulty);
    setBoard(newBoard);
    setUserBoard(newBoard.map((row) => [...row]));
    setNotes(Array.from({ length: 9 }, () => Array(9).fill("")));
    setDifficulty(newDifficulty);
    setAttempts(3);
    setShowConfetti(false);
    setShowPopup(false);
    setTimer(0);
    setIsPaused(false);
    setSelectedCell(null);

    const solution = getSolution(newBoard);
    const encryptedSolution = encryptSolution(solution);
    setSolutionHash(encryptedSolution);

    localStorage.setItem("sudokuSolutionHash", encryptedSolution);
    localStorage.setItem("sudokuAttempts", "3");
    localStorage.setItem("sudokuTimer", "0");
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleSubmitSolution = () => {
    if (attempts <= 0) {
      alert("No more attempts left!");
      return;
    }
    const solution = decryptSolution(solutionHash);
    if (JSON.stringify(userBoard) === JSON.stringify(solution)) {
      setShowConfetti(true);
      setShowPopup(true);
      setIsPaused(true);
    } else {
      setAttempts((prev) => prev - 1);
      alert(`Incorrect! You have ${attempts - 1} attempts remaining.`);
    }
  };

  const handleHint = () => {
    if (noteMode) {
      alert("Please disable note mode to use hints.");
      return;
    }
    const solution = decryptSolution(solutionHash);
    const candidates: { row: number; col: number }[] = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0 && userBoard[row][col] !== solution[row][col]) {
          candidates.push({ row, col });
        }
      }
    }
    if (candidates.length === 0) {
      alert("No hint available. The puzzle might be solved already.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * candidates.length);
    const { row, col } = candidates[randomIndex];
    const newBoard = userBoard.map((r) => [...r]);
    newBoard[row][col] = solution[row][col];
    setUserBoard(newBoard);
  };

  const handleCellClick = (row: number, col: number) => {
    if (isPaused) return;
    if (board[row][col] !== 0) return;
    setSelectedCell({ row, col });
  };

  const handleDialerClick = (num: number) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    if (board[row][col] !== 0) return;

    if (noteMode) {
      setNotes((prevNotes) => {
        const newNotes = prevNotes.map((r) => [...r]);
        const current = newNotes[row][col];
        const candidates = current.split("").filter((c) => c !== "");
        if (num === 0) {
          newNotes[row][col] = "";
        } else if (candidates.includes(num.toString())) {
          newNotes[row][col] = candidates
            .filter((c) => c !== num.toString())
            .sort()
            .join("");
        } else {
          candidates.push(num.toString());
          newNotes[row][col] = candidates.sort().join("");
        }
        return newNotes;
      });
    } else {
      const newBoard = userBoard.map((r) => [...r]);
      if (num === 0) {
        newBoard[row][col] = 0;
      } else {
        newBoard[row][col] = num;
      }
      setUserBoard(newBoard);
      // Add undo states
      setHistory([...history, newBoard.map(r => [...r])]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell || isPaused) return;
      const { row, col } = selectedCell;
      if (board[row][col] !== 0) return;

      if (e.key >= "1" && e.key <= "9") {
        const digit = parseInt(e.key);
        if (noteMode) {
          setNotes((prevNotes) => {
            const newNotes = prevNotes.map((r) => [...r]);
            const current = newNotes[row][col];
            const candidates = current.split("").filter((c) => c !== "");
            if (candidates.includes(digit.toString())) {
              newNotes[row][col] = candidates
                .filter((c) => c !== digit.toString())
                .sort()
                .join("");
            } else {
              candidates.push(digit.toString());
              newNotes[row][col] = candidates.sort().join("");
            }
            return newNotes;
          });
        } else {
          const newBoard = userBoard.map((r) => [...r]);
          newBoard[row][col] = digit;
          setUserBoard(newBoard);
          // Add undo states
          setHistory([...history, newBoard.map(r => [...r])]);
        }
      } else if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        if (noteMode) {
          setNotes((prevNotes) => {
            const newNotes = prevNotes.map((r) => [...r]);
            newNotes[row][col] = "";
            return newNotes;
          });
        } else {
          const newBoard = userBoard.map((r) => [...r]);
          newBoard[row][col] = 0;
          setUserBoard(newBoard);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell, noteMode, isPaused]);

  const handleUndo = () => {
    if (history.length > 0) {
      const previousBoard = history[history.length - 2] || board.map(r => [...r]);
      setUserBoard(previousBoard);
      setHistory(history.slice(0, history.length - 1));
    }
  };

  const handleReset = () => {
    setUserBoard(board.map((row) => [...row]));
    setNotes(Array.from({ length: 9 }, () => Array(9).fill("")));
    setAttempts(3);
    setTimer(0);
    setIsPaused(false);
  };

  return (
    <div className={styles.container}>
      {isClient && showConfetti && <Confetti width={pageSize.width} height={pageSize.height} className={styles.confetti} />}
      <h1 className={styles.title}>Sudoku</h1>

      <div className={styles.timer}>Time: {new Date(timer * 1000).toISOString().substr(14, 5)}</div>
      <div className={styles.attempts}>Attempts: {attempts}</div>

      <div className={styles.controls}>
        <button className={styles.difficultyButton} onClick={() => startNewGame("easy")}>Easy</button>
        <button className={styles.difficultyButton} onClick={() => startNewGame("medium")}>Medium</button>
        <button className={styles.difficultyButton} onClick={() => startNewGame("hard")}>Hard</button>
        <button className={styles.hintButton} onClick={handleHint}>Hint</button>
        <button className={styles.submitButton} onClick={handleSubmitSolution}>Submit</button>
        <button className={`${styles.noteModeButton} ${noteMode ? styles.active : ""}`} onClick={() => setNoteMode(!noteMode)}>Note Mode</button>
        <button className={styles.controlButton} onClick={handleUndo}>Undo</button>
        <button className={styles.controlButton} onClick={handleReset}>Reset</button>
      </div>

      <button className={styles.pauseButton} onClick={handlePause}>
        {isPaused ? "Resume" : "Pause"}
      </button>

      {isPaused && <div className={styles.pausedOverlay}>Paused</div>}

      <div className={styles.board}>
        {userBoard.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`${styles.cell} ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? styles.selectedCell : ""}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                tabIndex={0}
              >
                {cell !== 0 ? cell : notes[rowIndex][colIndex] ? <small>{notes[rowIndex][colIndex]}</small> : ""}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.numberPad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button
            key={num}
            className={styles.numberButton}
            onClick={() => handleDialerClick(num)}
          >
            {num === 0 ? "Clear" : num}
          </button>
        ))}
      </div>

      {showPopup && (
        <div className={styles.popup}>
          <h2>Congratulations!</h2>
          <p>You solved the puzzle!</p>
          <button className={styles.popupCloseButton} onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
} 