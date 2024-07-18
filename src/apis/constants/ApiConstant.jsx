export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const SIGNUP_API = `${BASE_URL}api/v1/auth/signup`;
export const LOGIN_API = `${BASE_URL}api/v1/auth/login`;
export const CREATE_CONNECTOR_API = (platform) =>
  `${BASE_URL}api/v1/connectors/?platform=${platform}`;
export const GET_ALL_CONNECTORS_API = `${BASE_URL}api/v1/connectors/`;
export const DELETE_CONNECTOR_API = (connector_id) =>
  `${BASE_URL}api/v1/connectors/${connector_id}`;
export const CREATE_ORGANIZATION_API = `${BASE_URL}api/v1/organization/`;
export const GET_ALL_USERS_BY_ORGANIZATIONS_API = `${BASE_URL}api/v1/organization/users`;
export const VERIFY_USER_API = (token) =>
  `${BASE_URL}api/v1/auth/verify?token=${token}`;
export const INVITE_USER_API = `${BASE_URL}api/v1/organization/invite`;
export const DELETE_USER_API = (user_id) =>
  `${BASE_URL}api/v1/organization/users/${user_id}`;
export const GET_ALL_GROUPS_API = `${BASE_URL}api/v1/groups/`;
export const DELETE_METRIC_API = (metric_id) =>
  `${BASE_URL}api/v1/metrics/${metric_id}`;
export const DELETE_GROUP_API = (group_id) =>
  `${BASE_URL}api/v1/groups/${group_id}`;
export const CREATE_GROUP_API = `${BASE_URL}api/v1/groups/`;
export const CREATE_METRIC_API = `${BASE_URL}api/v1/metrics/`;
export const GET_METRIC_BY_ID_API = (metric_id) =>
  `${BASE_URL}api/v1/metrics/${metric_id}`;
