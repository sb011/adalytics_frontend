import SignUpValidation from "./SignUpValidation";

const CreateOrganizationValidation = (organizationInfo) => {
  if (!organizationInfo.organizationName) {
    return "Organization Name is required";
  }
  var error = SignUpValidation(organizationInfo);
  if (error !== null) {
    return error;
  }
  return null;
};

export default CreateOrganizationValidation;
