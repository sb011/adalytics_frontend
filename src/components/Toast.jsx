import Styles from "../styles/Toast.module.css";
import CloseIcon from "../icons/red_close.png";

const Toast = ({ message, messageType, setMessage }) => {
  setTimeout(() => {
    setMessage("");
  }, 5000);
  return (
    <div className={Styles.toastbox}>
      <div className={Styles.toast_icon_box}>
        <img src={CloseIcon} alt="close" className={Styles.toast_icon} />
      </div>
      <div className={Styles.toast_msg_container}>
        <h1 className={Styles.toast_type}>
          {messageType === "error" ? "Error" : "Success"}
        </h1>
        <p className={Styles.toast_message}>{message}</p>
      </div>
    </div>
  );
};

export default Toast;
