import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getApiCall } from "../apis/ApiCall";
import { VERIFY_USER_API } from "../apis/constants/ApiConstant";
import Styles from "../styles/VerifyUser.module.css";

const VerifyUser = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const apiResponse = await getApiCall(
          VERIFY_USER_API(searchParams.get("token"))
        );
        if (apiResponse.errorMessage) {
          setError(apiResponse.errorMessage);
          return;
        } else {
          return navigate("/");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    verifyUser();
  }, [searchParams, navigate]);

  return <div className={Styles.container}>{error && <div>{error}</div>}</div>;
};

export default VerifyUser;
