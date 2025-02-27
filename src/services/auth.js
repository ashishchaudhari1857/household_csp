// api/auth.js

import { post } from "./base";

export const loginApi = async (credentials) => {
  const response = await post(null ,"/api/login", credentials); 
  return response.data;
};
export const logoutApi = async (credentials) => {
  const response = await post(null ,"/api/login", credentials); 
  return response.data;
};
