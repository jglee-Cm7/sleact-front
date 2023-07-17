import axios from "axios";

import { errorStatusHandler } from "@utils/connectionUtils";

export const apiBe = axios.create({
  baseURL: `${process.env.PUBLIC_BE_URL}`,
  timeout: 30_000,
  withCredentials: true,
  paramsSerializer(paramObj) {
    const params = new URLSearchParams();
    Object.keys(paramObj).forEach((key) => {
      if (paramObj[key] !== undefined && paramObj[key] !== null) {
        params.append(key, paramObj[key]);
      }
    });
    return params.toString();
  },
});

apiBe.interceptors.response.use(
  (response) =>
    // do something with the response data
    Promise.resolve(response),
  async (error) => {
    // const originalRequest = error.config;
    if (error && error.response) {
      // error handler
      errorStatusHandler(error.response);
    } else {
      // console.log('Failed to connect to server');
    }
    return Promise.reject(error);
  },
);

export function get(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    apiBe
      .get(url, { params })
      .then((res) => {
        if (res.status === 200) {
          if (res.data || !res.data.code) {
            // request is successful
            resolve(res.data);
          } else {
            // request error
            reject(res);
          }
        } else {
          // Server Error
          // console.log('Server Error!');
          reject(res);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function post(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    apiBe
      .post(url, data)
      .then((res) => {
        if (res.status === 200 || res.status === 201 || res.status === 204) {
          if (res.data || !res.data.code) {
            resolve(res.data);
            // reject(res);
          } else {
            reject(res);
          }
        } else {
          // console.log('Server Error!');
          reject(res);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
