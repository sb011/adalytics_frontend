import Client from "./Client";
import GoogleIcon from "../icons/google.png";
import { useGoogleLogin } from "@react-oauth/google";
import { postApiCall } from "../apis/ApiCall";
import { useState } from "react";
import { CREATE_CONNECTOR_API } from "../apis/constants/ApiConstant";
import Loading from "./Loading";

const GoogleClient = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLoginSuccess = async (tokenResponse) => {
    setIsLoading(true);
    const requestBody = {
      token: tokenResponse.code,
      platform: "GOOGLE",
    };
    console.log(requestBody);
    postApiCall(
      CREATE_CONNECTOR_API("GOOGLE"),
      requestBody,
      localStorage.getItem("token")
    )
      .then((response) => {
        if (response.errorMessage) {
          props.setError(response.errorMessage);
        } else {
          props.addConnector(response);
        }
      })
      .catch((error) => {
        props.setError("Error creating connector: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLoginError = (error) => {
    props.setError(error.message);
  };
  const handleLogin = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
    flow: "auth-code",
    scope:
      "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/adwords https://adwords.google.com/api/adwords https://adwords.google.com/api/adwords/ https://adwords.google.com/api/adwords/cm",
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Client
      handleClick={() => handleLogin()}
      hand
      icon={GoogleIcon}
      name="Google"
    />
  );
};

export default GoogleClient;
