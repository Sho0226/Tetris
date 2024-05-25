import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tetriscontainer}>
        <div className={styles.holdcontainer}>
          <div className={styles.holdstyle} />
        </div>
        <div className={styles.boardstyle} />
        <div className={styles.nextcontainer}>
          <div className={styles.nextstyle} />
        </div>
      </div>
    </div>
  );
};

export default Home;
