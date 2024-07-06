import React from "react";
import Styles from "../styles/WaitForEmailVerify.module.css";

const WaitForEmailVerify = () => {
  return (
    <div className={Styles.container}>
      <h1 className={Styles.verify_email_header}>
        Please check your email and verify your account to complete the
        registration process.
      </h1>
      <h2 className={Styles.verify_email_subheader}>
        You can close this tab now.
      </h2>
    </div>
  );
};

export default WaitForEmailVerify;
