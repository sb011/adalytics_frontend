import styles from "../styles/Auth.module.css";
import LoginValidation from "../validations/LoginValidation";
import Logo from "../icons/logo.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postApiCall } from "../apis/ApiCall";
import { LOGIN_API } from "../apis/constants/ApiConstant";

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

    const response = await postApiCall(LOGIN_API, userInfo);
    if (response.errorMessage) {
      setError(response.errorMessage);
      return;
    } else {
      if (response.token === undefined) return setError("Invalid credentials");
      localStorage.setItem("token", response.token);
      return navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <a href="/" className={styles.logo_link}>
        <img src={Logo} alt="logo" className={styles.logo} />
      </a>
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
          <a href="/forgot-password" className={styles.redirectTextLink}>
            Forgot password?
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
