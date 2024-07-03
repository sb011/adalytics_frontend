import Styles from "../styles/Connectors.module.css";
import FacebookClient from "../components/FacebookClient";

import { useEffect, useState } from "react";
import { deleteApiCall, getApiCall } from "../apis/ApiCall";
import {
  DELETE_CONNECTOR_API,
  GET_ALL_CONNECTORS_API,
} from "../apis/constants/ApiConstant";

import AddIcon from "../icons/add.png";
import CloseIcon from "../icons/close.png";
import FacebookIcon from "../icons/facebook.png";
import DeleteIcon from "../icons/delete.png";

const Connectors = () => {
  const [addConnectorOpen, setAddConnectorOpen] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState();

  useEffect(() => {
    const getAllConnectors = async () => {
      const apiResponse = await getApiCall(
        GET_ALL_CONNECTORS_API,
        localStorage.getItem("token")
      );
      if (apiResponse.errorMessage) {
        setError(apiResponse.errorMessage);
        return;
      } else {
        setResponse(apiResponse);
        console.log(apiResponse);
      }
    };

    getAllConnectors().catch((error) => {
      setError("Error getting connectors: " + error.message);
    });
  }, []);

  const handleDeleteConnector = async (id) => {
    const apiResponse = await deleteApiCall(
      DELETE_CONNECTOR_API(id),
      localStorage.getItem("token")
    );
    if (apiResponse.errorMessage) {
      setError(apiResponse.errorMessage);
      return;
    } else {
      setResponse(response.filter((connector) => connector.id !== id));
    }
  };

  return (
    <div className={Styles.connector_container}>
      <div className={Styles.connector_topbar}>
        <h1 className={Styles.connector_header}>Connector</h1>
        <div
          className={Styles.connector_add_btn_container}
          onClick={() => setAddConnectorOpen(!addConnectorOpen)}
        >
          <div className={Styles.connector_add_btn}>
            <img
              className={Styles.connector_add_icon}
              src={AddIcon}
              alt="add"
            />
          </div>
          <h1 className={Styles.connector_add_btn_txt}>Add</h1>
        </div>
        {addConnectorOpen && (
          <div className={Styles.connector_box}>
            <div className={Styles.connector_box_container}>
              <div className={Styles.connector_add_topbar}>
                <h1 className={Styles.connector_box_header}>Add Connector</h1>
                <div
                  className={Styles.connector_add_btn}
                  onClick={() => setAddConnectorOpen(!addConnectorOpen)}
                >
                  <img
                    className={Styles.connector_add_icon}
                    src={CloseIcon}
                    alt="close"
                  />
                </div>
              </div>
              {error && <p className={Styles.connector_error}>{error}</p>}
              <div className={Styles.connector_grid}>
                <FacebookClient setError={setError} />
              </div>
            </div>
          </div>
        )}
      </div>
      <table className={Styles.connector_table}>
        <thead className={Styles.connector_thead}>
          <tr className={Styles.connector_thead_tr}>
            <th className={Styles.connector_thead_th}>Id</th>
            <th className={Styles.connector_thead_th}>Platform</th>
            <th className={Styles.connector_thead_th}>Delete</th>
          </tr>
        </thead>
        {response && response.length > 0 && (
          <tbody className={Styles.connector_tbody}>
            {response.map((connector) => (
              <tr className={Styles.connector_tbody_tr} key={connector.id}>
                <td className={Styles.connector_tbody_td}>{connector.id}</td>
                <td className={Styles.connector_tbody_td}>
                  {connector.platform === "FACEBOOK" ? (
                    <img
                      className={Styles.connector_platform_icon}
                      src={FacebookIcon}
                      alt="facebook"
                    />
                  ) : (
                    "Unknown"
                  )}
                </td>
                <td className={Styles.connector_tbody_td}>
                  <img
                    className={Styles.connector_delete_icon}
                    src={DeleteIcon}
                    alt="delete"
                    onClick={() => handleDeleteConnector(connector.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {response && response.length === 0 && (
        <p className={Styles.connector_error}>No connectors found</p>
      )}
    </div>
  );
};

export default Connectors;
