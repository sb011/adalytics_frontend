import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_ORGANIZATION_API } from "../apis/constants/ApiConstant";
import { postApiCall } from "../apis/ApiCall";

import Logo from "../icons/logo.png";
import styles from "../styles/Auth.module.css";
import CreateOrganizationValidation from "../validations/CreateOrganizationValidation";

const CreateOrganization = () => {
  const organization = {
    organizationName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [organizationInfo, setOrganizationInfo] = useState(organization);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOrganizationInfo({
      ...organizationInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = CreateOrganizationValidation(organizationInfo);
    if (validation !== null) {
      setError(validation);
      return;
    }

    const response = await postApiCall(
      CREATE_ORGANIZATION_API,
      organizationInfo
    );
    if (response.errorMessage) {
      setError(response.errorMessage);
      return;
    } else {
      return navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <a href="/" className={styles.logo_link}>
        <img src={Logo} alt="logo" className={styles.logo} />
      </a>
      <div className={styles.box}>
        <h1 className={styles.header}>Create Organization</h1>
        <form className={styles.form}>
          <input
            type="text"
            name="organizationName"
            placeholder="Organization Name"
            value={organizationInfo.organizationName}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={organizationInfo.email}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={organizationInfo.password}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={organizationInfo.confirmPassword}
            onChange={handleChange}
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.btn} onClick={handleSubmit}>
            Create
          </button>
          <p className={styles.redirectText}>
            Already have an account?{" "}
            <a href="/login" className={styles.redirectTextLink}>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateOrganization;
