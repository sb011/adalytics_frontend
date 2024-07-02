import { useState } from "react";
import Styles from "../styles/Users.module.css";
import CloseIcon from "../icons/close.png";
import { useNavigate } from "react-router-dom";
import SignUpValidation from "../validations/SignUpValidation";
import { postApiCall } from "../apis/ApiCall";
import { SIGNUP_API } from "../apis/constants/ApiConstant";

const Users = () => {
  const user = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [addCreateUserOpen, setAddCreateUserOpen] = useState(false);
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

    const response = await postApiCall(
      SIGNUP_API,
      userInfo,
      localStorage.getItem("token")
    );
    if (response.errorMessage) {
      setError(response.errorMessage);
      return;
    } else {
      return navigate("/login");
    }
  };

  return (
    <div className={Styles.users_container}>
      <div className={Styles.users_topbar}>
        <h1>Users</h1>
        <div
          className={Styles.users_add_btn}
          onClick={() => setAddCreateUserOpen(!addCreateUserOpen)}
        >
          {/* <img className={Styles.users_add_icon} src={AddIcon} alt="add" /> */}
        </div>
        {addCreateUserOpen && (
          <div className={Styles.users_box}>
            <div className={Styles.users_box_container}>
              <div className={Styles.users_topbar}>
                <h1 className={Styles.users_box_header}>Add User</h1>
                <div
                  className={Styles.users_add_btn}
                  onClick={() => setAddCreateUserOpen(!addCreateUserOpen)}
                >
                  <img
                    className={Styles.users_add_icon}
                    src={CloseIcon}
                    alt="close"
                  />
                </div>
              </div>
              <form className={Styles.form}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userInfo.email}
                  onChange={handleChange}
                  className={Styles.input}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userInfo.password}
                  onChange={handleChange}
                  className={Styles.input}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={userInfo.confirmPassword}
                  onChange={handleChange}
                  className={Styles.input}
                />
                {error && <p className={Styles.error}>{error}</p>}
                <button className={Styles.btn} onClick={handleSubmit}>
                  Add User
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
