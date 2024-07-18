import Styles from "../styles/Dashboards.module.css";
import Group from "../components/Group";
import { useEffect, useState } from "react";
import { getApiCall } from "../apis/ApiCall";
import { GET_ALL_GROUPS_API } from "../apis/constants/ApiConstant";
import Loading from "../components/Loading";
import NoContent from "../components/NoContent";
import Toast from "../components/Toast";
import AddIcon from "../icons/add.png";
import AddGroup from "../components/AddGroup";
import AddMetric from "../components/AddMetric";

const Dashboards = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const [addMetricOpen, setAddMetricOpen] = useState(false);

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
          <AddGroup
            setAddGroupOpen={setAddGroupOpen}
            addGroupOpen={addGroupOpen}
            setIsLoading={setIsLoading}
            setError={setError}
            type="Add"
          />
        )}
        {addMetricOpen && (
          <AddMetric
            setAddMetricOpen={setAddMetricOpen}
            addMetricOpen={addMetricOpen}
            setIsLoading={setIsLoading}
            setError={setError}
            groups={groups}
            type="Add"
          />
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
              setAddGroupOpen={setAddGroupOpen}
              addGroupOpen={addGroupOpen}
              setIsLoading={setIsLoading}
              setError={setError}
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
