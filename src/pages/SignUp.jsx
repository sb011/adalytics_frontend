import { useState } from "react";
import SignUpApiCall from "../apis/ApiCalls";
import SignUpValidation from "../validations/SignUpValidation";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SignUp.module.css";

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

    const response = await SignUpApiCall(userInfo);
    if (response.errorMessage) {
      setError(response.errorMessage);
      return;
    } else {
      return navigate("/");
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
            <a className={styles.redirectTextLink} href="/">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
