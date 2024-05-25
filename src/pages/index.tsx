import styles from './index.module.css';

const Home = () => {
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
