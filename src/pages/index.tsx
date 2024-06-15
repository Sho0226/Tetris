import { useEffect, useState, useCallback } from 'react';
import styles from './index.module.css';

const tetrominoes: number[][][] = [
  [[1, 1, 1, 1]], // I
  [
    [2, 2],
    [2, 2],
  ], // O
  [
    [3, 3, 3],
    [0, 3, 0],
  ], // T
  [
    [0, 4, 4],
    [4, 4, 0],
  ], // S
  [
    [5, 5, 0],
    [0, 5, 5],
  ], // Z
  [
    [6, 0, 0],
    [6, 6, 6],
  ], // J
  [
    [0, 0, 7],
    [7, 7, 7],
  ], // L
];

interface Position {
  x: number;
  y: number;
}

const Home = () => {
  const [tetromino, setTetromino] = useState<number[][]>(tetrominoes[0]);
  const [position, setPosition] = useState<Position>({ x: 3, y: 0 });
  const [board, setBoard] = useState<number[][]>(
    Array.from({ length: 20 }, () => Array(10).fill(0)),
  );
  const [box, setBox] = useState<number[][]>(Array.from({ length: 4 }, () => Array(4).fill(0)));

  function getRandomTetromino() {
    return tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
  }

  const mergeBoardAndTetromino = (
    board: number[][],
    tetromino: number[][],
    position: Position,
  ): number[][] => {
    const newBoard = board.map((row) => row.slice());
    tetromino.forEach((row, dy) => {
      row.forEach((value, dx) => {
        if (
          value !== 0 &&
          newBoard[position.y + dy] !== undefined &&
          newBoard[position.y + dy][position.x + dx] !== undefined
        ) {
          newBoard[position.y + dy][position.x + dx] = value;
        }
      });
    });
    return newBoard;
  };

  const isCollision = (board: number[][], tetromino: number[][], position: Position): boolean => {
    return tetromino.some((row, dy) =>
      row.some(
        (value, dx) =>
          value !== 0 &&
          (board[position.y + dy] === undefined ||
            board[position.y + dy][position.x + dx] === undefined ||
            board[position.y + dy][position.x + dx] !== 0),
      ),
    );
  };

  const moveTetromino = useCallback(
    (dx: number, dy: number) => {
      const newPosition = { x: position.x + dx, y: position.y + dy };
      if (!isCollision(board, tetromino, newPosition)) {
        setPosition(newPosition);
      }
    },
    [board, tetromino, position],
  );

  const dropTetromino = useCallback(() => {
    const newPosition = { x: position.x, y: position.y + 1 };
    if (!isCollision(board, tetromino, newPosition)) {
      setPosition(newPosition);
    } else {
      const newBoard = mergeBoardAndTetromino(board, tetromino, position);
      setBoard(newBoard);
      const newTetromino = getRandomTetromino();
      setTetromino(newTetromino);
      setPosition({ x: 3, y: 0 });
      if (isCollision(newBoard, newTetromino, { x: 3, y: 0 })) {
        alert('Game Over');
        setBoard(Array.from({ length: 20 }, () => Array(10).fill(0)));
      }
    }
  }, [board, tetromino, position]);

  const rotateTetromino = useCallback(() => {
    const newTetromino: number[][] = tetromino[0].map((_, index) =>
      tetromino.map((row) => row[index]).reverse(),
    );
    if (!isCollision(board, newTetromino, position)) {
      setTetromino(newTetromino);
    }
  }, [tetromino, board, position]);

  const getColor = useCallback((value: number) => {
    switch (value) {
      case 1:
        return 'cyan'; // I
      case 2:
        return 'yellow'; // O
      case 3:
        return 'magenta'; // T
      case 4:
        return 'green'; // S
      case 5:
        return 'red'; // Z
      case 6:
        return 'blue'; // J
      case 7:
        return 'orange'; // L
      default:
        return '#fff'; // Empty
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dropTetromino();
    }, 1000);
    return () => clearInterval(interval);
  }, [dropTetromino]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') moveTetromino(-1, 0);
      if (e.key === 'ArrowRight') moveTetromino(1, 0);
      if (e.key === 'ArrowDown') dropTetromino();
      if (e.key === 'ArrowUp') rotateTetromino();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moveTetromino, dropTetromino, rotateTetromino]);

  const newBoard = mergeBoardAndTetromino(board, tetromino, position);

  return (
    <div className={styles.container}>
      <div className={styles.tetriscontainer}>
        <div className={styles.holdcontainer}>
          <span className={styles.text}>HOLD</span>

          <div className={styles.holdstyle}>
            {box.map((row, y) =>
              row.map((cell, x) => (
                <div
                  className={`${styles.cellstyle} ${cell === 0 ? '' : styles.linestyle}`}
                  key={`${x}-${y}`}
                  style={{ background: getColor(cell) }}
                />
              )),
            )}
          </div>
        </div>
        <div className={styles.boardstyle}>
          {newBoard.map((row, y) =>
            row.map((cell, x) => (
              <div
                className={`${styles.cellstyle} ${cell === 0 ? '' : styles.linestyle}`}
                key={`${x}-${y}`}
                style={{ background: getColor(cell) }}
              />
            )),
          )}
        </div>
        <div className={styles.nextcontainer}>
          <span className={styles.text}> NEXT</span>
          <div className={styles.nextstyle}>
            {box.map((row, y) =>
              row.map((cell, x) => (
                <div
                  className={`${styles.cellstyle} ${cell === 0 ? '' : styles.linestyle}`}
                  key={`${x}-${y}`}
                  style={{ background: getColor(cell) }}
                />
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
