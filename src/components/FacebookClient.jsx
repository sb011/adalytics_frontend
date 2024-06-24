import { useEffect, useState } from "react";
import FacebookIcon from "../public/facebook.png";
import { CreateConnectorApiCall } from "../apis/ApiCalls";
import Client from "./Client";

const FacebookClient = ({ setError }) => {
  const [response, setResponse] = useState();

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

  const handleFacebookLogin = async () => {
    window.FB.login(function (response) {
      setResponse(response);
    });
    const callResponse = await CreateConnectorApiCall(response);
    if (callResponse.errorMessage) {
      setError(callResponse.errorMessage);
      return;
    }
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
