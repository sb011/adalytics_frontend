import { useEffect, useRef } from "react";
import CloseIcon from "../icons/close.png";
import Styles from "../styles/ViewMetric.module.css";
import { Chart } from "chart.js";

const ViewMetric = ({ metric, setIsViewOpen, isViewOpen, canvasRef }) => {
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
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

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new chart instance
      chartInstanceRef.current = new Chart(ctx, {
        type: metric.metricType.toLowerCase(), // or 'line', 'pie', etc.
        data: data,
        options: options,
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [canvasRef, metric.metricType]);

  return (
    <div className={Styles.view_metric_box}>
      <div className={Styles.view_metric_box_container}>
        <div className={Styles.view_metric_topbar}>
          <h1 className={Styles.view_metric_box_header}>{metric.name}</h1>
          <div
            className={Styles.view_metric_add_btn}
            onClick={() => setIsViewOpen(!isViewOpen)}
          >
            <img
              className={Styles.view_metric_add_icon}
              src={CloseIcon}
              alt="close"
            />
          </div>
        </div>
        <div className={Styles.view_metric}>
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default ViewMetric;
