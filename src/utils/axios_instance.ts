import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = document.cookie
      .split(";")
      .find((cookie) => cookie.includes("accessToken"));

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken.split("=")[1]}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          "http://localhost:3000/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
