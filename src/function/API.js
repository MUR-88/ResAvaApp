//Home IP
// const API_URL = "http://192.168.100.15:8000/api/";
//hostspot IP
// const API_URL = "http://192.168.8.100:8000/api/";
// const API_URL = "http://192.168.68.219:8000/api/";
// const API_URL = "http://192.168.115.219:8000/api/";
const API_URL = "http://192.168.240.219:8000/api/";
// const API_URL = "http://192.168.1.100/api/";



// const API_URL = "http://192.168.100.21:8000/api/";

// const API_URL = "https://api.lapor-mas.id/v1";

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
      // console.log("API Await.Get", await response.text());
      // console.log("API .Get",res);

      if (!response.ok) {
        const error = await response.text();

        throw new Error(error || response.statusText);
      }

      // console.log("Test API.js : ", API_URL + path, requestOptions);
      const text = await response.text();
      // console.log("Test API.js : ", text);
      const res = text ? JSON.parse(text) : {};
      return res;
    } catch (error) {
      console.log("Error API.js", API_URL + path, requestOptions);
      console.log("Error API.js", error);
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
