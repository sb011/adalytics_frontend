import FacebookIcon from "../icons/facebook.png";
import Client from "./Client";

import { useEffect, useState } from "react";
import { postApiCall } from "../apis/ApiCall";
import { CREATE_CONNECTOR_API } from "../apis/constants/ApiConstant";
import Loading from "./Loading";

const FacebookClient = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const initializeFacebookSDK = () => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        xfbml: true,
        cookie: true,
        version: process.env.REACT_APP_FACEBOOK_API_VERSION,
      });
      window.FB.AppEvents.logPageView();
    };

    const loadFacebookSDK = (d, s, id) => {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    };

    loadFacebookSDK(document, "script", "facebook-jssdk");
  };

  useEffect(() => {
    initializeFacebookSDK();
  }, []);

  const handleFacebookLogin = async () => {
    window.FB.login(
      (response) => {
        console.log(response);
        if (response.authResponse) {
          const { accessToken, userID } = response.authResponse;

          window.FB.api("/me?fields=email", (profileResponse) => {
            setIsLoading(true);
            const requestBody = {
              token: accessToken,
              platform: "FACEBOOK",
            };

            postApiCall(
              CREATE_CONNECTOR_API("FACEBOOK"),
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
                setIsLoading(false);
              });
          });
        } else {
          setIsLoading(false);
          props.setError("User cancelled login or did not fully authorize.");
        }
      },
      {
        scope: "email,public_profile",
        config_id: process.env.REACT_APP_FACEBOOK_COFIG_ID,
      }
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Client
      handleClick={handleFacebookLogin}
      icon={FacebookIcon}
      name="Facebook"
    />
  );
};

export default FacebookClient;
