import Styles from "../styles/Users.module.css";
import InviteIcon from "../icons/invite.png";
import CloseIcon from "../icons/close.png";
import DeleteIcon from "../icons/delete.png";

import { useEffect, useState } from "react";
import { getApiCall } from "../apis/ApiCall";
import { GET_ALL_USERS_BY_ORGANIZATIONS_API } from "../apis/constants/ApiConstant";
import ConfirmationBox from "../components/ConfirmationBox";

const Users = () => {
  const [addCreateUserOpen, setAddCreateUserOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const apiResponse = await getApiCall(
        GET_ALL_USERS_BY_ORGANIZATIONS_API,
        localStorage.getItem("token")
      );
      if (apiResponse.errorMessage) {
        setError(apiResponse.errorMessage);
        return;
      } else {
        setUsers(apiResponse);
        console.log(apiResponse);
      }
    };

    getUsers().catch((error) => {
      setError("Error getting users: " + error.message);
    });
  }, []);

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
      <table className={Styles.users_table}>
        <thead className={Styles.users_thead}>
          <tr className={Styles.users_thead_tr}>
            <th className={Styles.users_thead_th}>Email</th>
            <th className={Styles.users_thead_th}>Username</th>
            <th className={Styles.users_thead_th}>Delete</th>
          </tr>
        </thead>
        {users && users.length > 0 && (
          <tbody className={Styles.connector_tbody}>
            {users.map((user) => (
              <tr className={Styles.users_tbody_tr} key={user.id}>
                <td className={Styles.users_tbody_td}>{user.email}</td>
                <td className={Styles.users_tbody_td}>{user.username}</td>
                <td className={Styles.users_tbody_td}>
                  <img
                    className={Styles.users_delete_icon}
                    src={DeleteIcon}
                    alt="delete"
                    onClick={() => setIsDeleteOpen(!isDeleteOpen)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {isDeleteOpen && (
        <ConfirmationBox
          message="Are you sure you want to delete this user?"
          cancel={() => setIsDeleteOpen(!isDeleteOpen)}
        />
      )}
      {users && users.length === 0 && (
        <p className={Styles.connector_error}>No connectors found</p>
      )}
    </div>
  );
};

export default Users;
