const SignUpValidation = (data) => {
  if (!data.email) {
    return "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    return "Email is invalid";
  }

  if (!data.password) {
    return "Password is required";
  }

  if (!data.confirmPassword) {
    return "Confirm Password is required";
  } else if (data.password !== data.confirmPassword) {
    return "Passwords do not match";
  }

  if (
    !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(data.password) ||
    data.password.length < 8
  ) {
    return "Password should be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  }

  return null;
};

export default SignUpValidation;
