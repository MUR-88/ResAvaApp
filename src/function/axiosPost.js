import axios from "axios";
import { variables } from "../variabel";

const axiosPost = async ({ route, data, headers, timeout = 5000 }) => {
  try {
    let response = await axios.post(`${variables.baseApi}${route}`, data, {
      headers,
      timeout,
    });

    if (response?.data?.status == 1) {
      return {
        status: response.data.status,
        status_code: response.data.status_code,
        data: response.data.data,
        message: response.data.message,
        action: response.data.action,
      };
    } else {
      return {
        status: response.data.status,
        status_code: response.data.status_code,
        data: response.data.data,
        message: response.data.message,
        action: response.data.action,
      };
    }
  } catch (err) {
    if (err.response?.data) {
      return {
        status: err.response.data.status,
        status_code: err.response.data.status_code,
        data: err.response.data.data,
        message: err.response.data.message,
        action: err.response.data.action,
      };
    } else {
      return {
        status: 0,
        status_code: null,
        message: err.message,
      };
    }
  }
};

export default axiosPost;
