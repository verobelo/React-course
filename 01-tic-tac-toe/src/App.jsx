import "./App.css";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import Square from "./components/Square.jsx";
import { TURNS, WINNERS_COMBINATIONS } from "./components/constants.js";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);
  const checkWinner = (boardToCheck) => {
    for (const combination of WINNERS_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const updateBoard = (index) => {
    if (board[index] !== null || winner) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  useEffect(() => {
    console.log("We have a winner: ", winner);
  }, [winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((value) => value !== null);
  };

  return (
    <main className="board">
      <h1>Tic-Tac-Toe</h1>
      <section className="game">
        {board.map((value, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {value}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <button onClick={resetGame}>Reset game</button>
      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>
              {winner === false ? "It's a tie!" : `Player ${winner} wins!`}
            </h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Play again</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
