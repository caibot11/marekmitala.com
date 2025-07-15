import type { Metadata } from "next";
import FunClient from "./FunClient";

export const metadata: Metadata = {
  title: "Fun - Games",
  description: "Play classic games like Sudoku and Minesweeper on Marek Mitala's portfolio site. Test your puzzle-solving skills.",
  keywords: ["sudoku", "minesweeper", "game", "fun", "puzzle", "Marek Mitala"],
  openGraph: {
    title: "Fun - Games | Marek Mitala",
    description: "Play classic games like Sudoku and Minesweeper on Marek Mitala's portfolio site.",
    url: "https://marekmitala.com/fun",
  },
  twitter: {
    title: "Fun - Games | Marek Mitala",
    description: "Play classic games like Sudoku and Minesweeper on Marek Mitala's portfolio site.",
  },
};

export default function FunPage() {
  return <FunClient />;
}
