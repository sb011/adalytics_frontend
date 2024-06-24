import { useEffect } from "react";
import FacebookIcon from "../public/facebook.png";
import Styles from "../styles/Connectors.module.css";

const FacebookClient = () => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "324738430574709",
        cookie: true,
        xfbml: true,
        version: "v20.0",
      });

      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(function (response) {
      console.log(response);
    });
  };
  return (
    <div className={Styles.connector_box_item} onClick={handleFacebookLogin}>
      <img
        className={Styles.connector_box_icon}
        src={FacebookIcon}
        alt="facebook"
      />
      <h1 className={Styles.connector_box_header}>Facebook</h1>
    </div>
  );
};

export default FacebookClient;
