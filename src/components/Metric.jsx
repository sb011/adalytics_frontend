import { Chart, registerables } from "chart.js";
import { useEffect, useRef, useState } from "react";
import Styles from "../styles/Metric.module.css";
import MenuIcon from "../icons/menu.png";
import ConfirmationBox from "./ConfirmationBox";
import { deleteApiCall } from "../apis/ApiCall";
import { DELETE_METRIC_API } from "../apis/constants/ApiConstant";
import ViewMetric from "./ViewMetric";

Chart.register(...registerables);

const Metric = ({ metric, group, groups, setGroups }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
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
  }, [metric.metricType]);

  const handleDelete = async () => {
    const response = await deleteApiCall(
      DELETE_METRIC_API(metric.id),
      localStorage.getItem("token")
    );
    if (response.errorMessage) {
      console.log("Error deleting metric: ", response.errorMessage);
      setIsDeleteOpen(false);
      return;
    } else {
      const newMetrics = group.metrics.filter((m) => m.id !== metric.id);
      const newGroups = groups.map((g) => {
        if (g.id === group.id) {
          return { ...g, metrics: newMetrics };
        }
        return g;
      });
      setGroups(newGroups);
    }
  };

  return (
    <div className={Styles.metric}>
      <div className={Styles.metric_topbar}>
        <h1 className={Styles.metric_name}>{metric.name}</h1>
        <div
          className={Styles.metric_menu}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img className={Styles.metric_menu_icon} src={MenuIcon} alt="menu" />
        </div>
        <nav
          className={`${Styles.metric_nav} ${
            isMenuOpen ? Styles.metric_nav_open : ""
          }`}
        >
          <div
            className={Styles.metric_nav_link}
            onClick={() => setIsViewOpen(!isViewOpen)}
          >
            View
          </div>
          <div className={Styles.metric_nav_link}>Edit</div>
          <div
            className={Styles.metric_nav_link}
            onClick={() => setIsDeleteOpen(!isDeleteOpen)}
          >
            Remove
          </div>
        </nav>
        {isDeleteOpen && (
          <ConfirmationBox
            message="Are you sure you want to delete this metric?"
            confirm={() => handleDelete()}
            setBoxOpen={setIsDeleteOpen}
          />
        )}
        {isViewOpen && (
          <ViewMetric
            metric={metric}
            setIsViewOpen={setIsViewOpen}
            isViewOpen={isViewOpen}
            canvasRef={canvasRef}
          />
        )}
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Metric;
