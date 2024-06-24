import Styles from "../styles/Connectors.module.css";
import AddIcon from "../public/add.png";
import { useState } from "react";
import CloseIcon from "../public/close.png";
import FacebookClient from "../components/FacebookClient";

const Connectors = () => {
  const [addConnectorOpen, setAddConnectorOpen] = useState(false);

  return (
    <div className={Styles.connector_container}>
      <h1 className={Styles.connector_header}>Connector</h1>
      <div className={Styles.connector_topbar}>
        <input
          className={Styles.connector_searchbar}
          type="text"
          placeholder="Search"
        />
        <div
          className={Styles.connector_add_btn}
          onClick={() => setAddConnectorOpen(!addConnectorOpen)}
        >
          <img className={Styles.connector_add_icon} src={AddIcon} alt="add" />
        </div>
        {addConnectorOpen && (
          <div className={Styles.connector_box}>
            <div className={Styles.connector_box_container}>
              <div className={Styles.connector_topbar}>
                <h1 className={Styles.connector_box_header}>Add Connector</h1>
                <div
                  className={Styles.connector_add_btn}
                  onClick={() => setAddConnectorOpen(!addConnectorOpen)}
                >
                  <img
                    className={Styles.connector_add_icon}
                    src={CloseIcon}
                    alt="add"
                  />
                </div>
              </div>
              <div className={Styles.connector_grid}>
                <FacebookClient />
              </div>
            </div>
          </div>
        )}
      </div>
      <ul className={Styles.connector_list}>No Connector</ul>
    </div>
  );
};

export default Connectors;
