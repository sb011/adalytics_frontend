import Styles from "../styles/Dashboards.module.css";
import Group from "../components/Group";
import { useEffect, useState } from "react";
import { getApiCall, postApiCall } from "../apis/ApiCall";
import {
  CREATE_GROUP_API,
  CREATE_METRIC_API,
  GET_ALL_GROUPS_API,
} from "../apis/constants/ApiConstant";
import Loading from "../components/Loading";
import NoContent from "../components/NoContent";
import Toast from "../components/Toast";
import AddIcon from "../icons/add.png";
import CloseIcon from "../icons/close.png";
import { MetricTypes } from "../Constants";
import MetricValidation from "../validations/MetricValidation";

const Dashboards = () => {
  const metric = {
    name: "",
    metricType: "",
    verticalAxisProperty: "",
    groupId: "",
  };
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [addMetricOpen, setAddMetricOpen] = useState(false);
  const [newMetric, setNewMetric] = useState(metric);

  useEffect(() => {
    const getGroups = async () => {
      setIsLoading(true);
      const apiResponse = await getApiCall(
        GET_ALL_GROUPS_API,
        localStorage.getItem("token")
      );
      if (apiResponse.errorMessage) {
        setError(apiResponse.errorMessage);
        return;
      } else {
        setGroups(apiResponse);
      }
    };

    getGroups()
      .catch((error) => {
        setError("Error getting groups: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName) {
      setError("Group name is required");
      return;
    }

    const requestBody = {
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
      window.location.reload();
    }
    setIsLoading(false);
    setAddGroupOpen(false);
  };

  const handleChange = (e) => {
    setNewMetric({ ...newMetric, [e.target.name]: e.target.value });
  };

  const handleAddMetric = async (e) => {
    e.preventDefault();
    console.log(newMetric);
    const validation = MetricValidation(newMetric);
    if (validation !== null) {
      setError(validation);
      return;
    }

    setIsLoading(true);
    const apiResponse = await postApiCall(
      CREATE_METRIC_API,
      newMetric,
      localStorage.getItem("token")
    );
    if (apiResponse.errorMessage) {
      setError(apiResponse.errorMessage);
      setIsLoading(false);
      return;
    } else {
      window.location.reload();
    }
    setIsLoading(false);
    setAddMetricOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={Styles.dashboards_container}>
      <div className={Styles.dashboards_topbar}>
        <h1 className={Styles.dashboards_header}>Dashboards</h1>
        <div className={Styles.dashboards_add_btns}>
          <div
            className={Styles.dashboards_add_btn_container}
            onClick={() => setAddGroupOpen(!addGroupOpen)}
          >
            <div className={Styles.dashboards_add_btn}>
              <img
                className={Styles.dashboards_add_icon}
                src={AddIcon}
                alt="add"
              />
            </div>
            <h1 className={Styles.dashboards_add_btn_txt}>Add Group</h1>
          </div>
          <div
            className={Styles.dashboards_add_btn_container}
            onClick={() => setAddMetricOpen(!addMetricOpen)}
          >
            <div className={Styles.dashboards_add_btn}>
              <img
                className={Styles.dashboards_add_icon}
                src={AddIcon}
                alt="add"
              />
            </div>
            <h1 className={Styles.dashboards_add_btn_txt}>Add Metric</h1>
          </div>
        </div>
        {addGroupOpen && (
          <div className={Styles.dashboards_box}>
            <div className={Styles.dashboards_box_container}>
              <div className={Styles.dashboards_add_topbar}>
                <h1 className={Styles.dashboards_box_header}>Add group</h1>
                <div
                  className={Styles.dashboards_add_btn}
                  onClick={() => setAddGroupOpen(!addGroupOpen)}
                >
                  <img
                    className={Styles.dashboards_add_icon}
                    src={CloseIcon}
                    alt="close"
                  />
                </div>
              </div>
              <div className={Styles.form}>
                <input
                  className={Styles.input}
                  type="text"
                  placeholder="Group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div className={Styles.btn_container}>
                <button className={Styles.btn} onClick={handleSubmit}>
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
        {addMetricOpen && (
          <div className={Styles.dashboards_box}>
            <div className={Styles.dashboards_box_container}>
              <div className={Styles.dashboards_add_topbar}>
                <h1 className={Styles.dashboards_box_header}>Add Metric</h1>
                <div
                  className={Styles.dashboards_add_btn}
                  onClick={() => setAddMetricOpen(!addMetricOpen)}
                >
                  <img
                    className={Styles.dashboards_add_icon}
                    src={CloseIcon}
                    alt="close"
                  />
                </div>
              </div>
              <div className={Styles.form}>
                <input
                  className={Styles.input}
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={newMetric.name}
                  onChange={handleChange}
                />
                <select
                  name="metricType"
                  className={Styles.input}
                  value={newMetric.metricType}
                  onChange={handleChange}
                >
                  <option className={Styles.select_default} value="" disabled>
                    Select metric type
                  </option>
                  {MetricTypes.map((metricType) => (
                    <option key={metricType.id} value={metricType.id}>
                      {metricType.name}
                    </option>
                  ))}
                </select>
                <input
                  className={Styles.input}
                  name="verticalAxisProperty"
                  type="text"
                  placeholder="Y-axis property"
                  value={newMetric.verticalAxisProperty}
                  onChange={handleChange}
                />
                <select
                  name="groupId"
                  className={Styles.input}
                  value={newMetric.groupId}
                  onChange={handleChange}
                >
                  <option className={Styles.select_default} value="" disabled>
                    Select group
                  </option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={Styles.btn_container}>
                <button className={Styles.btn} onClick={handleAddMetric}>
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={Styles.dashboards_groups}>
        {groups.length > 0 ? (
          groups.map((group) => (
            <Group
              key={group.id}
              group={group}
              groups={groups}
              setGroups={setGroups}
            />
          ))
        ) : (
          <NoContent message="No metrics found" />
        )}
      </div>
      {error && (
        <Toast message={error} messageType="error" setMessage={setError} />
      )}
    </div>
  );
};

export default Dashboards;
