import Styles from "../styles/AddMetric.module.css";
import CloseIcon from "../icons/close.png";
import { useEffect, useState } from "react";
import MetricValidation from "../validations/MetricValidation";
import { postApiCall } from "../apis/ApiCall";
import { CREATE_METRIC_API } from "../apis/constants/ApiConstant";
import { MetricTypes } from "../Constants";

const AddMetric = ({
  setAddMetricOpen,
  addMetricOpen,
  setError,
  setIsLoading,
  groups,
  oldMetric,
  type,
}) => {
  const metric = {
    id: null,
    name: "",
    metricType: "",
    verticalAxisProperty: "",
    groupId: "",
  };

  const [newMetric, setNewMetric] = useState(metric);

  useEffect(() => {
    if (oldMetric) {
      setNewMetric(oldMetric);
    }
  }, [oldMetric]);

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

  return (
    <div className={Styles.add_metric_box}>
      <div className={Styles.add_metric_box_container}>
        <div className={Styles.add_metric_add_topbar}>
          <h1 className={Styles.add_metric_box_header}>{type} Metric</h1>
          <div
            className={Styles.add_metric_add_btn}
            onClick={() => setAddMetricOpen(!addMetricOpen)}
          >
            <img
              className={Styles.add_metric_add_icon}
              src={CloseIcon}
              alt="close"
            />
          </div>
        </div>
        <form className={Styles.form}>
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
          <div className={Styles.btn_container}>
            <button className={Styles.btn} onClick={handleAddMetric}>
              {type}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMetric;
