import Styles from "../styles/AddGroup.module.css";
import CloseIcon from "../icons/close.png";
import { useEffect, useState } from "react";
import { postApiCall } from "../apis/ApiCall";
import { CREATE_GROUP_API } from "../apis/constants/ApiConstant";

const AddGroup = ({
  setAddGroupOpen,
  addGroupOpen,
  setIsLoading,
  setError,
  group,
  type,
  addGroup,
}) => {
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    if (group) {
      setGroupName(group.name);
    }
  }, [group]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName) {
      setError("Group name is required");
      return;
    }

    const requestBody = {
      id: group ? group.id : null,
      name: groupName,
    };

    setIsLoading(true);
    const apiResponse = await postApiCall(
      CREATE_GROUP_API,
      requestBody,
      localStorage.getItem("token")
    );
    if (apiResponse.errorMessage) {
      setError(apiResponse.errorMessage);
      setIsLoading(false);
      return;
    } else {
      console.log(apiResponse);
      addGroup(apiResponse);
    }
    setIsLoading(false);
    setAddGroupOpen(false);
  };
  return (
    <div className={Styles.add_group_box}>
      <div className={Styles.add_group_box_container}>
        <div className={Styles.add_group_add_topbar}>
          <h1 className={Styles.add_group_box_header}>{type} group</h1>
          <div
            className={Styles.add_group_add_btn}
            onClick={() => setAddGroupOpen(!addGroupOpen)}
          >
            <img
              className={Styles.add_group_add_icon}
              src={CloseIcon}
              alt="close"
            />
          </div>
        </div>
        <form className={Styles.form}>
          <input
            className={Styles.input}
            type="text"
            placeholder="Group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <div className={Styles.btn_container}>
            <button className={Styles.btn} onClick={handleSubmit}>
              {type}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGroup;
