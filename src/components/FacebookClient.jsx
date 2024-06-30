import FacebookIcon from "../icons/facebook.png";
import Client from "./Client";

import { useEffect } from "react";
import { postApiCall } from "../apis/ApiCall";
import { CREATE_CONNECTOR_API } from "../apis/constants/ApiConstant";

const FacebookClient = (props) => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: process.env.REACT_APP_FACEBOOK_API_VERSION,
        status: false,
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

  const handleFacebookLogin = async () => {
    window.FB.login(function (response) {
      if (response.authResponse && response.status === "connected") {
        const requestBody = {
          token: response.authResponse.accessToken,
          platform: "FACEBOOK",
          platformUserId: response.authResponse.userID,
        };
        postApiCall(
          CREATE_CONNECTOR_API,
          requestBody,
          localStorage.getItem("token")
        )
          .then((response) => {
            if (response.errorMessage) {
              props.setError(response.errorMessage);
            } else {
              window.location.reload();
            }
          })
          .catch((error) => {
            props.setError("Error creating connector: " + error.message);
          });
      } else {
        props.setError("User cancelled login or did not fully authorize.");
      }
    });
  };

  return (
    <Client
      handleClick={handleFacebookLogin}
      icon={FacebookIcon}
      name="Facebook"
    />
  );
};

export default FacebookClient;
