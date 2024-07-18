import { useEffect, useRef, useState } from "react";
import Styles from "../styles/ViewMetric.module.css";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { getApiCall } from "../apis/ApiCall";
import { GET_METRIC_BY_ID_API } from "../apis/constants/ApiConstant";
import Loading from "../components/Loading";
import Toast from "../components/Toast";

const ViewMetric = () => {
  const [metric, setMetric] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const chartRef = useRef(null);

  useEffect(() => {
    const getMetricById = async () => {
      setIsLoading(true);
      const apiResponse = await getApiCall(
        GET_METRIC_BY_ID_API(id),
        localStorage.getItem("token")
      );
      if (apiResponse.errorMessage) {
        setError(apiResponse.errorMessage);
        return;
      } else {
        setMetric(apiResponse);
        console.log(apiResponse);
      }
    };

    getMetricById()
      .catch((error) => {
        setError("Error getting metric: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const options = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        autoSelected: "zoom",
      },
    },
    xaxis: {
      tickPlacement: "on",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  };

  const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 150, 160, 200],
    },
  ];

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className={Styles.view_metric_box}>
      <div className={Styles.view_metric_topbar}>
        <h1 className={Styles.view_metric_box_header}>{metric.name}</h1>
      </div>
      <Chart
        ref={chartRef}
        options={options}
        series={series}
        type="bar"
        width="100%"
        height="260%"
      />
      {error && (
        <Toast message={error} messageType="error" setMessage={setError} />
      )}
    </div>
  );
};

export default ViewMetric;
