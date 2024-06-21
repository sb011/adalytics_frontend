import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Auth.module.css";
import LoginValidation from "../validations/LoginValidation";
import { LoginApiCall } from "../apis/ApiCalls";

const Login = () => {
  const user = {
    email: "",
    password: "",
  };

  const [userInfo, setUserInfo] = useState(user);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = LoginValidation(userInfo);
    if (validation !== null) {
      setError(validation);
      return;
    }

    const response = await LoginApiCall(userInfo);
    if (response.errorMessage) {
      setError(response.errorMessage);
      return;
    } else {
      localStorage.setItem("token", response.token);
      return navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.header}>Login</h1>
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
          {error && <p className={styles.error}>{error}</p>}
          <button onClick={handleSubmit} className={styles.btn}>
            Login
          </button>
          <p className={styles.redirectText}>
            Don't have an account?{" "}
            <a className={styles.redirectTextLink} href="/signup">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
