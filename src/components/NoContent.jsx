import Styles from "../styles/NoContent.module.css";

const NoContent = ({ message }) => {
  return (
    <div className={Styles.nocontent_container}>
      <div className={Styles.nocontent_box}>
        <h1 className={Styles.nocontent_emoji}>: - (</h1>
        <p className={Styles.nocontent_msg}>{message}</p>
      </div>
    </div>
  );
};

export default NoContent;
