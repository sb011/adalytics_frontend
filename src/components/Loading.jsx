import Styles from "../styles/Loading.module.css";
import Logo from "../icons/logo.png";

const Loading = () => {
  return (
    <div className={Styles.Loading_container}>
      <div className={Styles.Loading_logo_container}>
        <img src={Logo} alt="logo" className={Styles.Loading_logo} />
      </div>
      <div className={Styles.Loading_spinner_container}>
        <svg className={Styles.Loading_spinner} viewBox="0 0 50 50">
          <circle
            className={Styles.main_circle}
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="3"
          ></circle>
          <circle
            className={Styles.sub_circle}
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="3"
          ></circle>
        </svg>
      </div>
      <h1 className={Styles.Loading_header}>
        Hold tight! Your content is on its way.
      </h1>
    </div>
  );
};

export default Loading;
