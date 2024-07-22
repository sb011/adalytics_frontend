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
import GoogleIcon from "../icons/google.png";
import DeleteIcon from "../icons/delete.png";
import ConfirmationBox from "../components/ConfirmationBox";
import Loading from "../components/Loading";
import GoogleClient from "../components/GoogleClient";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NoContent from "../components/NoContent";
import Toast from "../components/Toast";

const Connectors = () => {
  const [addConnectorOpen, setAddConnectorOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllConnectors = async () => {
      setIsLoading(true);
      const apiResponse = await getApiCall(
        GET_ALL_CONNECTORS_API,
        localStorage.getItem("token")
      );
      if (apiResponse.errorMessage) {
        setError(apiResponse.errorMessage);
        return;
      } else {
        setResponse(apiResponse);
      }
    };

    getAllConnectors()
      .catch((error) => {
        setError("Error getting connectors: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleDeleteConnector = async (id) => {
    setIsLoading(true);
    const apiResponse = await deleteApiCall(
      DELETE_CONNECTOR_API(id),
      localStorage.getItem("token")
    );
    if (apiResponse.errorMessage) {
      setError(apiResponse.errorMessage);
      setIsLoading(false);
      return;
    } else {
      setResponse(response.filter((connector) => connector.id !== id));
    }
    setIsLoading(false);
  };

  const addConnector = (connector) => {
    setResponse([...response, connector]);
  };

  if (isLoading) {
    return <Loading />;
  }

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
              <div className={Styles.connector_grid}>
                <FacebookClient
                  setError={setError}
                  addConnector={addConnector}
                />
                <GoogleOAuthProvider
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                >
                  <GoogleClient
                    setError={setError}
                    addConnector={addConnector}
                  />
                </GoogleOAuthProvider>
              </div>
            </div>
          </div>
        )}
      </div>
      {response && response.length > 0 ? (
        <table className={Styles.connector_table}>
          <thead className={Styles.connector_thead}>
            <tr className={Styles.connector_thead_tr}>
              <th className={Styles.connector_thead_th}>Email</th>
              <th className={Styles.connector_thead_th}>Platform</th>
              <th className={Styles.connector_thead_th}>Expires In</th>
              <th className={Styles.connector_thead_th}>Delete</th>
            </tr>
          </thead>
          {response && response.length > 0 && (
            <tbody className={Styles.connector_tbody}>
              {response.map((connector) => (
                <tr className={Styles.connector_tbody_tr} key={connector.id}>
                  <td className={Styles.connector_tbody_td}>
                    {connector.email}
                  </td>
                  <td className={Styles.connector_tbody_td}>
                    {connector.platform === "FACEBOOK" ? (
                      <img
                        className={Styles.connector_platform_icon}
                        src={FacebookIcon}
                        alt="facebook"
                      />
                    ) : connector.platform === "GOOGLE" ? (
                      <img
                        className={Styles.connector_platform_icon}
                        src={GoogleIcon}
                        alt="google"
                      />
                    ) : (
                      "Unknown"
                    )}
                  </td>
                  <td className={Styles.connector_tbody_td}>
                    <div className={Styles.connector_re_authentication}>
                      {connector.expirationTime < Date.now() ? (
                        <div className={Styles.connector_red_dot}></div>
                      ) : connector.expirationTime <
                        Date.now() + 7 * 24 * 60 * 60 * 1000 ? (
                        <div className={Styles.connector_orange_dot}></div>
                      ) : (
                        <div className={Styles.connector_green_dot}></div>
                      )}
                      {connector.expirationTime === 9223372036854775807
                        ? "Never"
                        : new Date(connector.expirationTime).toLocaleString()}
                    </div>
                  </td>
                  <td className={Styles.connector_tbody_td}>
                    <img
                      className={Styles.connector_delete_icon}
                      src={DeleteIcon}
                      alt="delete"
                      onClick={() => setIsDeleteOpen(!isDeleteOpen)}
                    />
                  </td>
                  {isDeleteOpen && (
                    <ConfirmationBox
                      message="Are you sure you want to delete this connector?"
                      confirm={() => handleDeleteConnector(connector.id)}
                      setBoxOpen={setIsDeleteOpen}
                    />
                  )}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      ) : (
        <NoContent message="No Connectors Found" />
      )}
      {error && (
        <Toast message={error} messageType="error" setMessage={setError} />
      )}
    </div>
  );
};

export default Connectors;
