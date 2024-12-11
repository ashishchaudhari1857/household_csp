import axios from 'axios';
import _ from "lodash";

const API = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

async function apiRequest({
  method,
  path,
  params,
  body,
  authToken,
  apiVersion,
}) {

  console.log('Environment Variable:', process.env.REACT_APP_API_BASE_URL)
  const baseUrl = _.defaultTo(
    process.env.REACT_APP_API_BASE_URL,
    "http://127.0.0.1:5000",
  );

  let fullPath;
  const path_http = path.startsWith("https");
  if (path_http) {
    fullPath = path;
  } else {
    if (!_.isNil(apiVersion)) {
      fullPath = `${baseUrl}/api/${apiVersion}${path}`;
    } else {
      fullPath = `${baseUrl}/api${path}`;
    }
  }

  const headers = {
    "Content-Type": "application/json",
    "X-Client-Id": "xxx",
  };

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  // Remove undefined and null values from params
  const cleanedParams = _.pickBy(params, (value) => value !== undefined && value !== null);

  try {
    const startTime = performance.now();
    const response = await API.request({
      url: fullPath,
      method,
      headers,
      params: cleanedParams, // Automatically handles query params
      data: body, // Automatically handles JSON body
    });
    const endTime = performance.now();

    console.info("apiRequest", {
      method,
      fullPath,
      status: response.status,
      took: Math.round(endTime - startTime),
    });

    let { data } = response;
    if (data && _.has(data, "data")) {
      // If response has a nested "data" field, unwrap it
      data = data.data;
    }

    return { status: response.status, data };
  } catch (error) {
    const status = error.response?.status || 500;
    console.error("apiRequest Error", { method, fullPath, status, error: error.message });
    return { status, data: error.response?.data || null };
  }
}

// Reusable HTTP methods (GET, POST, PUT)
export async function post(authToken, path, body = null, apiVersion = "v1") {
  return apiRequest({ method: "POST", apiVersion, path, body, authToken });
}

export async function put(authToken, path, body = null, apiVersion = "v1") {
  return apiRequest({ method: "PUT", apiVersion, path, body, authToken });
}

export async function get(authToken, path, params = null, apiVersion = "v1") {
  return apiRequest({ method: "GET", apiVersion, path, params, authToken });
}

// Export the HTTP methods for use in your app
export default {
  get,
  post,
  put,
};
