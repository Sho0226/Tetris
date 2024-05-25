import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tetriscontainer}>
        <div className={styles.holdstyle} />
        <div className={styles.boardstyle} />
        <div className={styles.nextstyle} />
      </div>
    </div>
  );
};

export default Home;
