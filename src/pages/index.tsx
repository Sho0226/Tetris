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

const Home: React.FC = () => {
  const [tetromino, setTetromino] = useState<number[][]>(tetrominoes[0]);
  const [position, setPosition] = useState<Position>({ x: 3, y: 0 });
  const [nextTetromino, setNextTetromino] = useState<number[][] | null>(null);
  const [board, setBoard] = useState<number[][]>(
    Array.from({ length: 20 }, () => Array(10).fill(0)),
  );

  useEffect(() => {
    setNextTetromino(getRandomTetromino());
  }, []);

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
      row.forEach((cell, dx) => {
        if (
          cell !== 0 &&
          newBoard[position.y + dy] !== undefined &&
          newBoard[position.y + dy][position.x + dx] !== undefined
        ) {
          newBoard[position.y + dy][position.x + dx] = cell;
        }
      });
    });
    return newBoard;
  };

  const isCollision = (board: number[][], tetromino: number[][], position: Position): boolean => {
    return tetromino.some((row, dy) =>
      row.some(
        (cell, dx) =>
          cell !== 0 &&
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
      setTetromino(nextTetromino);
      setNextTetromino(getRandomTetromino());
      setPosition({ x: 3, y: 0 });
      if (isCollision(newBoard, nextTetromino, { x: 3, y: 0 })) {
        alert('Game Over');
        setBoard(Array.from({ length: 20 }, () => Array(10).fill(0)));
      }
    }
  }, [board, tetromino, position, nextTetromino]);

  const rotateTetromino = useCallback(() => {
    const newTetromino: number[][] = tetromino[0].map((_, index) =>
      tetromino.map((row) => row[index]).reverse(),
    );
    if (!isCollision(board, newTetromino, position)) {
      setTetromino(newTetromino);
    }
  }, [tetromino, board, position]);

  const getColor = useCallback((cell: number) => {
    switch (cell) {
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

  // 各テトリミノの幅と高さを計算し、中央に配置
  const getCenteredTetromino = (tetromino: number[][]): number[][] => {
    let maxWidth = 5;
    let maxHeight = 5;
    const tetrominoType = tetromino[0][0];
    if (tetrominoType === 1) {
      // I型
      maxWidth = 6;
      maxHeight = 5;
    } else if (tetrominoType === 2) {
      // O型
      maxWidth = 4;
      maxHeight = 4;
    }
    const offsetX = Math.floor((maxWidth - tetromino[0].length) / 2);
    const offsetY = Math.floor((maxHeight - tetromino.length) / 2);

    const centeredTetromino = Array.from({ length: maxHeight }, () => Array(maxWidth).fill(0));
    tetromino.forEach((row, y) => {
      row.forEach((cell, x) => {
        centeredTetromino[offsetY + y][offsetX + x] = cell;
      });
    });

    return centeredTetromino;
  };

  const getNextStyle = (): React.CSSProperties => {
    let maxWidth = 5;
    let maxHeight = 4;
    if (nextTetromino) {
      const tetrominoType = nextTetromino[0][0];
      if (tetrominoType === 1) {
        // I型
        maxWidth = 6;
        maxHeight = 5;
      } else if (tetrominoType === 2) {
        // O型
        maxWidth = 4;
        maxHeight = 4;
      }
    }
    return {
      width: `${maxWidth * 25}px`,
      height: `${maxHeight * 25}px`,
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.tetriscontainer}>
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
          <span className={styles.text}>NEXT</span>
          {nextTetromino && (
            <div className={styles.nextstyle} style={getNextStyle()}>
              {getCenteredTetromino(nextTetromino).map((row, y) =>
                row.map((cell, x) => (
                  <div
                    className={`${styles.cellstyle} ${cell === 0 ? '' : styles.linestyle}`}
                    key={`${x}-${y}`}
                    style={{ background: getColor(cell) }}
                  />
                )),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
