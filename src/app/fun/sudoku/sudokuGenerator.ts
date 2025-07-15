export function generatePuzzle(difficulty: "easy" | "medium" | "hard"): number[][] {
    const solution = generateSudokuSolution();
    const puzzle = removeNumbersForDifficulty(solution, difficulty);
    return puzzle;
}

export function getSolution(board: number[][]): number[][] {
    return solveSudoku(board);
}

export function encryptSolution(solution: number[][]): string {
    return btoa(JSON.stringify(solution));
}


export function decryptSolution(hash: string): number[][] {
    return JSON.parse(atob(hash));
}


function generateSudokuSolution(): number[][] {
    const board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
    
    function isValid(board: number[][], row: number, col: number, num: number): boolean {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) return false;
        }
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    }

    function fillBoard(board: number[][]): boolean {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    const numbers = [...Array(9)].map((_, i) => i + 1).sort(() => Math.random() - 0.5);
                    for (const num of numbers) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (fillBoard(board)) return true;
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    fillBoard(board);
    return board;
}


function removeNumbersForDifficulty(solution: number[][], difficulty: "easy" | "medium" | "hard"): number[][] {
    const puzzle = solution.map(row => [...row]);
    const removeCount = difficulty === "easy" ? 35 : difficulty === "medium" ? 45 : 55;

    let removed = 0;
    while (removed < removeCount) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (puzzle[row][col] !== 0) {
            puzzle[row][col] = 0;
            removed++;
        }
    }

    return puzzle;
}


function solveSudoku(board: number[][]): number[][] {
    const solvedBoard = board.map(row => [...row]);

    function isValid(board: number[][], row: number, col: number, num: number): boolean {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) return false;
        }
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    }

    function solve(board: number[][]): boolean {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solve(board)) return true;
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    solve(solvedBoard);
    return solvedBoard;
} 