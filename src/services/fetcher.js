import axios from "axios";

const fetcher = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    Tokencybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NCIsIkhldEhhblN0cmluZyI6IjIyLzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNjMzNjAwMDAwMCIsIm5iZiI6MTY4NzcxMjQwMCwiZXhwIjoxNzE2NDgzNjAwfQ.argi0m1LRAePDxZ6Nb4AX25fZ9gclDCUAA5oW84-TsQ",
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
