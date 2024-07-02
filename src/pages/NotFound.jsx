import styles from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.header}>404</h1>
        <p className={styles.subtitle}>
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
