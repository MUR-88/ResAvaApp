//Home IP
// const API_URL = "http://192.168.100.21:8000/api/";
//hostspot IP
const API_URL = "http://192.168.194.219:8000/api/";


class Api {
  token = null;

  constructor() {
    if (API_URL === undefined) {
      throw new Error("API_URL is undefined");
    }
  }

  setToken(token) {
    this.token = token;
  }

  resetToken() {
    this.token = null;
  }

  getToken() {
    return this.token;
  }

  async request(path, options = {}) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${this.getToken()}`);
    headers.append("Accept", "application/json");

    if (!(options.body instanceof FormData)) {
      headers.append("Content-Type", "application/json");
    }

    const requestOptions = {
      mode: "cors",
      credentials: "include",
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${API_URL}${path}`, requestOptions);
      const res = await response.json();

      if (!response.ok) {
        return Promise.reject(res);
      }

      return res;
    } catch (error) {
      console.error(error.stack);
      return Promise.reject({
        ...error,
        message: error.message,
      });
    }
  }

  get(path) {
    return this.request(path);
  }

  put(path, body) {
    return this.request(path, { method: "PUT", body: JSON.stringify(body) });
  }

  remove(path, body) {
    return this.request(path, { method: "DELETE", body: JSON.stringify(body) });
  }

  post(path, body) {
    return this.request(path, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  }
}

const API = new Api();

export default API;
