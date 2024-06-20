import { useState } from "react";
import SignUpApiCall from "../apis/ApiCalls";
import SignUpValidation from "../validations/SignUpValidation";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Sign Up</h1>
      <form>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={userInfo.confirmPassword}
          onChange={handleChange}
        />
        {error && <p>{error}</p>}
        <button onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
