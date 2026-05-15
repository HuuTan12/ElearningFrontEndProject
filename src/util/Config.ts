import axios, { type AxiosError, type AxiosInstance } from "axios";

export const DOMAIN = "https://elearningnew.cybersoft.edu.vn/api";

export const ACCESSTOKEN = "accessToken";

export const USERLOGIN = "userLogin";

// ================= LOCAL STORAGE =================

export const saveLocalStorage = (name: string, value: any): void => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getLocalStorage = <T>(name: string): T | null => {
  const data = localStorage.getItem(name);

  return data ? JSON.parse(data) : null;
};

export const saveLocalStorageString = (name: string, value: string): void => {
  localStorage.setItem(name, value);
};

export const getLocalStorageString = (name: string): string | null => {
  return localStorage.getItem(name);
};

export const removeStore = (name: string): void => {
  localStorage.removeItem(name);
};

// ================= AXIOS =================

export const httpClient: AxiosInstance = axios.create({
  baseURL: DOMAIN,

  timeout: 30000,
});

// ================= REQUEST =================

httpClient.interceptors.request.use(
  (config) => {
    let token = localStorage
      .getItem("accessToken")
      ?.replace(/"/g, "");

    if (!token) {
      const userLogin = localStorage.getItem("userLogin");

      if (userLogin) {
        token = JSON.parse(userLogin).accessToken;
      }
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.headers) {
      config.headers.TokenCybersoft =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MSIsIkhldEhhblN0cmluZyI6IjAyLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4ODMwNzIwMDAwMCIsIm5iZiI6MTc1OTk0MjgwMCwiZXhwIjoxNzg4NDU0ODAwfQ.3f2gLYDZla_lDH4GWmfgSe9Il_QHrpoHIWhW6FSKTi8";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE =================

httpClient.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        alert("Bạn cần đăng nhập!");
        break;

      case 403:
        alert("Không có quyền!");
        break;

      case 404:
        alert("Không tìm thấy!");
        break;

      case 500:
        alert("Server lỗi!");
        break;

      default:
        alert("Lỗi hệ thống!");
    }

    return Promise.reject(error);
  },
);
