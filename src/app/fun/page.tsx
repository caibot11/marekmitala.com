"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import styles from "./fun.module.css";
import {
  generatePuzzle,
  getSolution,
  encryptSolution,
  decryptSolution,
} from "./funGenerator";

export default function FunPage() {
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

  // Which cell is currently selected by the user (for final input or note input)?
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

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
        savedNotes ? JSON.parse(savedNotes) : Array.from({ length: 9 }, () => Array(9).fill(""))
      );
      setDifficulty(savedDifficulty as "easy" | "medium" | "hard");
      setSolutionHash(savedSolutionHash);
      setAttempts(parseInt(savedAttempts));
      setTimer(savedTimer ? parseInt(savedTimer) : 0);
    } else {
      startNewGame(difficulty);
    }
  }, []);

  // Timer logic: only increments if not paused.
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  // Save game state whenever relevant changes occur.
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
      // Stop timer once puzzle is solved
      setIsPaused(true);
    } else {
      setAttempts((prev) => prev - 1);
      alert(`Incorrect! You have ${attempts - 1} attempts remaining.`);
    }
  };

  // Reveal a hint in one random empty or incorrect cell (if noteMode is off).
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

  // When user clicks a cell:
  const handleCellClick = (row: number, col: number) => {
    if (isPaused) return;
    // If the cell is locked (original puzzle number), do nothing.
    if (board[row][col] !== 0) return;
    // Otherwise, select that cell for input (final or note).
    setSelectedCell({ row, col });
  };

  // Dialer click: user chooses a number (1–9 or 0 for clear).
  const handleDialerClick = (num: number) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    if (board[row][col] !== 0) return; // locked cell, ignore.

    if (noteMode) {
      // Toggle note
      setNotes((prevNotes) => {
        const newNotes = prevNotes.map((r) => [...r]);
        let current = newNotes[row][col];
        const candidates = current.split("").filter((c) => c !== "");
        if (num === 0) {
          // 0 = clear all notes
          newNotes[row][col] = "";
        } else if (candidates.includes(num.toString())) {
          // remove
          newNotes[row][col] = candidates
            .filter((c) => c !== num.toString())
            .sort()
            .join("");
        } else {
          // add
          candidates.push(num.toString());
          newNotes[row][col] = candidates.sort().join("");
        }
        return newNotes;
      });
    } else {
      // Final input
      const newBoard = userBoard.map((r) => [...r]);
      if (num === 0) {
        // Clear the cell
        newBoard[row][col] = 0;
      } else {
        newBoard[row][col] = num;
      }
      setUserBoard(newBoard);
    }
  };

  // Keyboard input for selected cell
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell || isPaused) return;
      const { row, col } = selectedCell;
      // If locked cell, do nothing
      if (board[row][col] !== 0) return;

      // If user typed a digit 1–9
      if (e.key >= "1" && e.key <= "9") {
        const digit = parseInt(e.key);
        if (noteMode) {
          // Toggle note
          setNotes((prevNotes) => {
            const newNotes = prevNotes.map((r) => [...r]);
            let current = newNotes[row][col];
            const candidates = current.split("").filter((c) => c !== "");
            if (candidates.includes(digit.toString())) {
              // remove
              newNotes[row][col] = candidates
                .filter((c) => c !== digit.toString())
                .sort()
                .join("");
            } else {
              // add
              candidates.push(digit.toString());
              newNotes[row][col] = candidates.sort().join("");
            }
            return newNotes;
          });
        } else {
          // Final input
          setUserBoard((prevBoard) => {
            const newBoard = prevBoard.map((r) => [...r]);
            newBoard[row][col] = digit;
            return newBoard;
          });
        }
      }

      // If user typed '0', 'Backspace', or 'Delete' => clear
      if (e.key === "0" || e.key === "Backspace" || e.key === "Delete") {
        if (noteMode) {
          // Clear all notes in this cell
          setNotes((prevNotes) => {
            const newNotes = prevNotes.map((r) => [...r]);
            newNotes[row][col] = "";
            return newNotes;
          });
        } else {
          // Clear final input
          setUserBoard((prevBoard) => {
            const newBoard = prevBoard.map((r) => [...r]);
            newBoard[row][col] = 0;
            return newBoard;
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCell, noteMode, isPaused, board]);

  return (
    <div className={styles.container}>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={400}
          recycle={false}
          gravity={0.3}
        />
      )}
      <h1 className={styles.title}>Fun Puzzle</h1>

      <div className={styles.timer}>
        Time: {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
        {timer % 60}
      </div>
      <button onClick={handlePause} className={styles.pauseButton}>
        {isPaused ? "Resume" : "Pause"}
      </button>

      <div className={styles.controls}>
        <button
          onClick={() => startNewGame("easy")}
          className={`${styles.difficultyButton} ${
            difficulty === "easy" ? styles.active : ""
          }`}
        >
          Easy
        </button>
        <button
          onClick={() => startNewGame("medium")}
          className={`${styles.difficultyButton} ${
            difficulty === "medium" ? styles.active : ""
          }`}
        >
          Medium
        </button>
        <button
          onClick={() => startNewGame("hard")}
          className={`${styles.difficultyButton} ${
            difficulty === "hard" ? styles.active : ""
          }`}
        >
          Hard
        </button>
        <button onClick={handleHint} className={styles.hintButton}>
          Hint
        </button>
        <button onClick={handleSubmitSolution} className={styles.submitButton}>
          Submit Solution ({attempts} tries left)
        </button>
        <button
          onClick={() => setNoteMode((prev) => !prev)}
          className={styles.noteModeButton}
        >
          {noteMode ? "Notes: On" : "Notes: Off"}
        </button>
      </div>

      <div className={styles.board}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, colIndex) => {
              const solution = decryptSolution(solutionHash);
              // Highlight if userBoard has a wrong entry (only in easy mode).
              const isWrong =
                difficulty === "easy" &&
                userBoard[rowIndex][colIndex] !== 0 &&
                userBoard[rowIndex][colIndex] !== solution[rowIndex][colIndex];

              const isSelected =
                selectedCell &&
                selectedCell.row === rowIndex &&
                selectedCell.col === colIndex;

              return (
                <div
                  key={colIndex}
                  className={`${styles.cell} ${isWrong ? styles.wrongInput : ""} ${
                    isSelected ? styles.selectedCell : ""
                  }`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {userBoard[rowIndex][colIndex] !== 0 ? (
                    userBoard[rowIndex][colIndex]
                  ) : (
                    // Show small candidate notes if no final number
                    <small>{notes[rowIndex][colIndex]}</small>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Dialer (for final input or notes) */}
      <div className={styles.numberPad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleDialerClick(num)}
            className={styles.numberButton}
          >
            {num}
          </button>
        ))}
        {/* "0" to clear the cell or clear the note */}
        <button onClick={() => handleDialerClick(0)} className={styles.numberButton}>
          Clear
        </button>
      </div>

      {/* Popup on win */}
      {showPopup && (
        <div className={styles.popup}>
          <h2>Congratulations!</h2>
          <p>You solved the puzzle!</p>
          <button
            onClick={() => setShowPopup(false)}
            className={styles.popupCloseButton}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
