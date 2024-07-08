import Styles from "../styles/ConfirmationBox.module.css";

const ConfirmationBox = ({ message, confirm, setBoxOpen }) => {
  const handleConfirm = () => {
    confirm();
    setBoxOpen(false);
  };

  const handleCancel = () => {
    setBoxOpen(false);
  };

  return (
    <div className={Styles.confirmation_container}>
      <div className={Styles.confirmation_box}>
        <h1 className={Styles.confirmation_header}>{message}</h1>
        <div className={Styles.confirmation_btn_container}>
          <h1
            className={Styles.confirmation_confirm_btn}
            onClick={handleConfirm}
          >
            Confirm
          </h1>
          <h1 className={Styles.confirmation_cancel_btn} onClick={handleCancel}>
            Cancel
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;
