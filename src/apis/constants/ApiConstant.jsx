export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const SIGNUP_API = `${BASE_URL}api/v1/auth/signup`;
export const LOGIN_API = `${BASE_URL}api/v1/auth/login`;
export const CREATE_CONNECTOR_API = `${BASE_URL}api/v1/connectors/`;
export const GET_ALL_CONNECTORS_API = `${BASE_URL}api/v1/connectors/`;
export const DELETE_CONNECTOR_API = (connector_id) =>
  `${BASE_URL}api/v1/connectors/${connector_id}`;
export const CREATE_ORGANIZATION_API = `${BASE_URL}api/v1/organization/`;
