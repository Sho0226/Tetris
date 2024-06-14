import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [tetromino, setTetromino] = useState(0);
  const [board, setBoard] = useState([
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]);

  const tetrominoes = [
    // I
    //水色
    //
    [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    // O
    //黄色
    [
      [1, 1],
      [1, 1],
    ],
    // T
    //マゼンタ
    [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    // S
    //緑
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    // Z
    //緑
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    // J
    //オレンジ
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    // L
    //オレンジ
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
  ];

  const newBoard = structuredClone(board);
  console.table(newBoard);
  const clickHandler = (x: number, y: number) => {
    newBoard[y][x] = tetromino;

    if (tetromino === 1) {
      setTetromino(0);
    } else {
      setTetromino(1);
    }
    setBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tetriscontainer}>
        <div className={styles.holdcontainer}>
          <span className={styles.text}>HOLD</span>

          <div className={styles.holdstyle} />
        </div>
        <div className={styles.boardstyle}>
          {board.map((row, y) =>
            row.map((cell, x) => (
              <div
                className={styles.cellstyle}
                key={`${x}-${y}`}
                onClick={() => clickHandler(x, y)}
                style={{ background: cell === 1 ? '#8f8f8f' : '' }}
              />
            )),
          )}
        </div>
        <div className={styles.nextcontainer}>
          <span className={styles.text}> NEXT</span>
          <div className={styles.nextstyle} />
        </div>
      </div>
    </div>
  );
};

export default Home;
