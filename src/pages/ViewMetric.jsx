import { useEffect, useRef, useState } from "react";
import Styles from "../styles/ViewMetric.module.css";
import { Chart } from "chart.js";
import { useParams } from "react-router-dom";
import { getApiCall } from "../apis/ApiCall";
import { GET_METRIC_BY_ID_API } from "../apis/constants/ApiConstant";
import Loading from "../components/Loading";
import Toast from "../components/Toast";

const ViewMetric = () => {
  const [metric, setMetric] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  const { id } = useParams();

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

  useEffect(() => {
    if (metric.metricType && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      const data = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: "My Second dataset",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            data: [28, 48, 40, 19, 86, 27, 90],
          },
          {
            label: "My Third dataset",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            data: [45, 25, 30, 50, 55, 60, 70],
          },
          {
            label: "My Fourth dataset",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            data: [20, 30, 40, 50, 60, 70, 80],
          },
          {
            label: "My Fifth dataset",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            data: [10, 20, 30, 40, 50, 60, 70],
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2 | 3,
        plugins: {
          // title: {
          //   display: true,
          //   text: metric.name,
          // },
          legend: {
            display: true,
            labels: {
              usePointStyle: true,
            },
            position: "bottom",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: metric.metricType.toLowerCase(),
        data: data,
        options: options,
      });

      return () => {
        chartRef.current.destroy();
      };
    }
  }, [metric.metricType]);

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className={Styles.view_metric_box}>
      <div className={Styles.view_metric_topbar}>
        <h1 className={Styles.view_metric_box_header}>{metric.name}</h1>
      </div>
      <canvas ref={canvasRef} width="100%"></canvas>
      {error && (
        <Toast message={error} messageType="error" setMessage={setError} />
      )}
    </div>
  );
};

export default ViewMetric;
