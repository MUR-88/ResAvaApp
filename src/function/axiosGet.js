import axios from "axios";
import { variables } from "../variabel";

const axiosGet = async ({ route, config }) => {
  const source = axios.CancelToken.source();

  try {
    let response = await axios.get(`${variables.baseApi}${route}`, {
      ...config,
      cancelToken: source.token,
    });
    if (response.data.status == 1) {
      return {
        status: response.data.status,
        status_code: response.data.status_code,
        data: response.data.data,
        message: response.data.message,
        action: response.data.action,
        source,
      };
    } else {
      return {
        status: response.data.status,
        status_code: response.data.status_code,
        data: response.data.data,
        message: response.data.message,
        action: response.data.action,
        source,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

export default axiosGet;
