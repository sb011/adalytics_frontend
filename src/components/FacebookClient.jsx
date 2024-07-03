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
        xfbml: true,
        version: process.env.REACT_APP_FACEBOOK_API_VERSION,
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
    window.FB.login(
      function (response) {
        if (response.authResponse && response.status === "connected") {
          window.FB.api(
            "/me?fields=email",
            function (profileResponse) {
              const requestBody = {
                token: response.authResponse.accessToken,
                platform: "FACEBOOK",
                platformUserId: response.authResponse.userID,
                email: profileResponse.email,
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
                })
                .finally(() => {
                  window.FB.logout();
                });
            },
            {
              scope: "email",
              return_scopes: true,
            }
          );
        } else {
          props.setError("User cancelled login or did not fully authorize.");
          window.FB.logout();
        }
      },
      {
        scope: "email",
        return_scopes: true,
      }
    );
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
