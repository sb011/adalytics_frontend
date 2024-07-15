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
      CREATE_CONNECTOR_API,
      requestBody,
      localStorage.getItem("token")
    )
      .then((response) => {
        if (response.errorMessage) {
          props.setError(response.errorMessage);
        } else {
          // window.location.reload();
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
    console.log("Login Failed:", error);
  };
  const handleLogin = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
    flow: "auth-code",
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
