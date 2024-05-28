import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [board, setBoard] = useState([
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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

  return (
    <div className={styles.container}>
      <div className={styles.tetriscontainer}>
        <div className={styles.holdcontainer}>
          <span className={styles.text}>HOLD</span>

          <div className={styles.holdstyle} />
        </div>
        <div className={styles.boardstyle} />
        <div className={styles.nextcontainer}>
          <span className={styles.text}> NEXT</span>
          <div className={styles.nextstyle} />
        </div>
      </div>
    </div>
  );
};

export default Home;
