const LoginValidation = (userInfo) => {
  if (!userInfo.email) {
    return "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
    return "Email is invalid";
  }

  if (!userInfo.password) {
    return "Password is required";
  }

  return null;
};

export default LoginValidation;
