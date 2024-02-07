import axios from "axios";

const fetcher = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    Tokencybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgMzciLCJIZXRIYW5TdHJpbmciOiIzMS8xMi8yMTAwIiwiSGV0SGFuVGltZSI6IjQxMzM4OTQ0MDAwMDAiLCJuYmYiOjE2OTg1MTI0MDAsImV4cCI6MTcxNjY1NjQwMH0.nJ0FPo5wkc1WgelxELfkD3BJ8WrFfjXNH_EGwFMsWh8",
  },
});

//interceptor
fetcher.interceptors.response.use(
  (response) => {
    return response.data.content;
  },

  (error) => {
    return Promise.reject(error.response.data.content);
  }
);

fetcher.interceptors.request.use(
  (config) => {
    // thêm authorization vào header config (nếu có)
    const { accessToken } = JSON.parse(localStorage.getItem("user")) || {};

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default fetcher;
