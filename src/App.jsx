/*
https://react.dev/learn/tutorial-tic-tac-toe#wrapping-up

If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game, listed in order of increasing difficulty:

X 1. For the current move only, show “You are at move #…” instead of a button.
X 2. Rewrite Board to use two loops to make the squares instead of hardcoding them.
X 3. Add a toggle button that lets you sort the moves in either ascending or descending order.
X 4. When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
5. Display the location for each move in the format (row, col) in the move history list.
*/

import React, { useState } from "react";

function Square({ value, isWinning, onSquareClick }) {
  return (
    <button className={"square" + (isWinning ? " win" : "")} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(index) {
    if (calculateWinner(squares)[0] || squares[index]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    onPlay(nextSquares);
  }

  const [winner, winningSquares] = calculateWinner(squares);
  let status;
  if (winner === "None") {
    status = "Draw!";
  } else if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "0");
  }

  // TODO: Use length from squares
  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const boardSquares = [];
    for (let column = 0; column < 3; column++) {
      const cellId = (row * 3) + column;

      const isWinning = winningSquares.includes(cellId);
      boardSquares.push((
        <Square key={column} value={squares[cellId]} isWinning={isWinning} onSquareClick={() => handleClick(cellId)} />
      ));
    }

    boardRows.push((
      <div key={row} className="board-row">
        {boardSquares}
      </div>
    ));
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [reverseMoves, setReverseMoves] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function showReverseHistory() {
    setReverseMoves(!reverseMoves);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (currentMove === move) {
      if (move > 0) {
        description = "Currently at move #" + move;
      } else {
        description = "Currently at game start";
      }
      return (
        <li key={move}>
          {description}
        </li>
      )
    }

    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });

  if (reverseMoves) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={showReverseHistory}>Reverse</button>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let index = 0; index < lines.length; index++) {
    const [a, b, c] = lines[index];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }

  // Draw
  if (squares.filter(x => !x).length === 0) {
    return ["None", [null, null, null]];
  }

  return [null, [null, null, null]];
}