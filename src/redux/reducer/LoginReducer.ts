import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import { httpClient } from "../../util/Config";
import { message } from "antd";

const checkHandleLogin = () => {
  if(localStorage.getItem("userLogin") && localStorage.getItem("accessToken")) {
    return JSON.parse(localStorage.getItem("userLogin")!);  
  }
  return true;
}



export interface UserLogin {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  hoTen: string;
  accessToken: string;
  chiTietKhoaHocGhiDanh: any[];
}

interface LoginState {
  userLogin: UserLogin | null;
  userProfile: UserLogin | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  userLogin: checkHandleLogin(),
  userProfile: null,
  loading: false,
  error: null,
};

const LoginReducer = createSlice({
  name: "LoginReducer",

  initialState,

  reducers: {
    getLogin: (state, action) => {
      state.userLogin = action.payload;
    },

    getProfile: (state, action) => {
      state.userProfile = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.userLogin = null;
      state.userProfile = null;
      state.error = null;
    },
  },
});

export const { getLogin, getProfile, setLoading, setError, logout } =
  LoginReducer.actions;

export default LoginReducer.reducer;

export const LoginThunk =
  (
    loginData: {
      taiKhoan: string;
      matKhau: string;
    },
    navigate: any,
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const result = await httpClient.post(
        "/QuanLyNguoiDung/DangNhap",
        loginData,
      );
    

      const userData = result.data;

      dispatch(getLogin(userData));

      localStorage.setItem("userLogin", JSON.stringify(userData));

      

      localStorage.setItem("accessToken", userData.accessToken);

      await dispatch(getProfileThunk());

      message.success("Đăng nhập thành công");

      navigate("/");
    } catch (error: any) {
      dispatch(setError(error.response?.data || "Đăng nhập thất bại"));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getProfileThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const result = await httpClient.post<UserLogin>(
        "/QuanLyNguoiDung/ThongTinTaiKhoan",
      );

      dispatch(getProfile(result.data));
    } catch (error: any) {
      dispatch(
        setError(error.response?.data?.content || "Lấy profile thất bại"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
};
