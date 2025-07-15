import type { Metadata } from "next";
import FunClient from "./FunClient";

export const metadata: Metadata = {
  title: 'Fun - Sudoku Game',
  description: 'Play Sudoku on Marek Mitala\'s portfolio site. Test your puzzle-solving skills with easy, medium, and hard difficulties.',
  keywords: ['sudoku', 'game', 'fun', 'puzzle', 'Marek Mitala'],
  openGraph: {
    title: 'Fun - Sudoku Game | Marek Mitala',
    description: 'Play Sudoku on Marek Mitala\'s portfolio site. Test your puzzle-solving skills with easy, medium, and hard difficulties.',
    url: 'https://marekmitala.com/fun',
  },
  twitter: {
    title: 'Fun - Sudoku Game | Marek Mitala',
    description: 'Play Sudoku on Marek Mitala\'s portfolio site. Test your puzzle-solving skills with easy, medium, and hard difficulties.',
  },
};

export default function FunPage() {
  return <FunClient />;
}
