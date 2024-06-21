import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5041/api",
});

// Add a request interceptor to attach the access token to outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration and refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 (Unauthorized) and the request was not already retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Request a new access token using the refresh token
        const response = await axios.post(
          "http://localhost:5041/api/user/UserAccount/RefreshToken",
          {
            refreshToken: localStorage.getItem("refreshToken"),
          }
        );

        // Update the access token in local storage
        localStorage.setItem("token", response.data.token);

        // Retry the original request with the new access token
        originalRequest.headers["Authorization"] = `Bearer ${response.data.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure
        console.error("Refresh token failed:", refreshError);
        // Redirect to login page or perform other actions
      }
    }

    // Return any error that is not related to token expiration
    return Promise.reject(error);
  }
);

export default api;
