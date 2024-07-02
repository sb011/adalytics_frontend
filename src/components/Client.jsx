import Styles from "../styles/Connectors.module.css";

const Client = (props) => {
  return (
    <div className={Styles.connector_box_item} onClick={props.handleClick}>
      <img
        className={Styles.connector_box_icon}
        src={props.icon}
        alt={props.name}
      />
      <h1 className={Styles.connector_box_item_header}>{props.name}</h1>
    </div>
  );
};

export default Client;
