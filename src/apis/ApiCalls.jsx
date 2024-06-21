import { SIGNUP_API, LOGIN_API } from "./constants/ApiConstant";

export const SignUpApiCall = async (data) => {
  try {
    const response = await fetch(SIGNUP_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return { errorMessage: error.errorMessage };
  }
};

export const LoginApiCall = async (data) => {
  try {
    const response = await fetch(LOGIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return { errorMessage: error.errorMessage };
  }
};
