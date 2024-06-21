import { SIGNUP_API } from "./constants/ApiConstant";

// const SignUpApiCall = async (data) => {
//   const response = await fetch(SIGNUP_API, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const responseData = await response.json();
//   return responseData;
// };
// do it with error handling
const SignUpApiCall = async (data) => {
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

export default SignUpApiCall;
