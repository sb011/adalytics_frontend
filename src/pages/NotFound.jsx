import styles from "../styles/Auth.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>404</h1>
        <p>Page not found</p>
      </div>
    </div>
  );
};

export default NotFound;
