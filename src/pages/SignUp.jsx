import SignUpValidation from "../validations/SignUpValidation";
import styles from "../styles/Auth.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postApiCall } from "../apis/ApiCall";
import { SIGNUP_API } from "../apis/constants/ApiConstant";

const SignUp = () => {
  const user = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [userInfo, setUserInfo] = useState(user);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = SignUpValidation(userInfo);
    if (validation !== null) {
      setError(validation);
      return;
    }

    const response = await postApiCall(SIGNUP_API, userInfo);
    if (response.errorMessage) {
      setError(response.errorMessage);
      return;
    } else {
      return navigate("/login");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.header}>Sign Up</h1>
        <form className={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userInfo.confirmPassword}
            onChange={handleChange}
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.btn} onClick={handleSubmit}>
            Sign Up
          </button>
          <p className={styles.redirectText}>
            Already have an account?{" "}
            <a className={styles.redirectTextLink} href="/login">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
