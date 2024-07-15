import { useRef, useState } from "react";
import Styles from "../styles/Group.module.css";
import Metric from "./Metric";
import ArrowDownIcon from "../icons/arrow_down.png";
import DeleteIcon from "../icons/delete.png";
import EditIcon from "../icons/edit.png";
import { deleteApiCall } from "../apis/ApiCall";
import { DELETE_GROUP_API } from "../apis/constants/ApiConstant";
import ConfirmationBox from "./ConfirmationBox";

const Group = ({ group, groups, setGroups }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const arrowRef = useRef();

  const handleArrowClick = () => {
    setIsOpen(!isOpen);
    arrowRef.current.style.transform = `rotate(${isOpen ? "180deg" : "0deg"})`;
  };

  const handleDelete = async () => {
    const response = await deleteApiCall(
      DELETE_GROUP_API(group.id),
      localStorage.getItem("token")
    );
    if (response.errorMessage) {
      console.log("Error deleting group: ", response.errorMessage);
      setIsDeleteOpen(false);
      return;
    } else {
      const newGroups = groups.filter((g) => g.id !== group.id);
      setGroups(newGroups);
    }
    setIsDeleteOpen(false);
  };

  return (
    <div className={Styles.group_container}>
      <div className={Styles.group_topbar}>
        <div className={Styles.group_name_box}>
          <h1 className={Styles.group_name}>{group.name}</h1>
          <button
            className={Styles.group_open_icon_box}
            onClick={handleArrowClick}
            ref={arrowRef}
          >
            <img
              className={Styles.group_open_icon}
              src={ArrowDownIcon}
              alt="arrow_down"
            />
          </button>
        </div>
        <div
          className={Styles.group_delete_box}
          onClick={() => setIsDeleteOpen(true)}
        >
          <img
            className={Styles.group_delete_icon}
            src={DeleteIcon}
            alt="delete"
          />
        </div>
        {isDeleteOpen && (
          <ConfirmationBox
            message="Are you sure you want to delete this group? This will delete all the metrics in this group."
            confirm={() => handleDelete()}
            setBoxOpen={setIsDeleteOpen}
          />
        )}
      </div>
      {isOpen &&
        (group.metrics.length > 0 ? (
          <div className={Styles.group_metrics}>
            {group.metrics.map((metric) => (
              <Metric
                key={metric.id}
                metric={metric}
                group={group}
                groups={groups}
                setGroups={setGroups}
              />
            ))}
          </div>
        ) : (
          <h1 className={Styles.group_no_metrics}>No metrics available</h1>
        ))}
    </div>
  );
};

export default Group;
