import Styles from "../styles/Users.module.css";
import InviteIcon from "../icons/invite.png";
import CloseIcon from "../icons/close.png";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Users = () => {
  const [addCreateUserOpen, setAddCreateUserOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addEmail = (event) => {
    if (event.target.value !== "" && event.key === "Enter") {
      setEmailList([...emailList, event.target.value]);
      setEmail("");
    }
  };

  const removeEmail = (indexToRemove) => {
    const t = emailList.filter((_, index) => index !== indexToRemove);
    setEmailList(t);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(emailList);
  };

  return (
    <div className={Styles.users_container}>
      <div className={Styles.users_topbar}>
        <h1 className={Styles.users_header}>Users</h1>
        <div
          className={Styles.users_add_btn_container}
          onClick={() => setAddCreateUserOpen(!addCreateUserOpen)}
        >
          <div className={Styles.users_add_btn}>
            <img className={Styles.users_add_icon} src={InviteIcon} alt="add" />
          </div>
          <h1 className={Styles.users_add_btn_txt}>Invite</h1>
        </div>
        {addCreateUserOpen && (
          <div className={Styles.users_box}>
            <div className={Styles.users_box_container}>
              <div className={Styles.users_box_topbar}>
                <h1 className={Styles.users_box_header}>Invite User</h1>
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
              <div className={Styles.form}>
                {emailList.map((email, index) => (
                  <div className={Styles.item_values} key={index}>
                    <span className={Styles.value}>{email}</span>
                    <span
                      className={Styles.remove}
                      onClick={() => removeEmail(index)}
                    >
                      &times;
                    </span>
                  </div>
                ))}
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email, for multiple emails use enter key"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={Styles.input}
                  onKeyDown={addEmail}
                />
              </div>
              {error && <p className={Styles.error}>{error}</p>}
              <button className={Styles.btn} onClick={handleSubmit}>
                Invite
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
