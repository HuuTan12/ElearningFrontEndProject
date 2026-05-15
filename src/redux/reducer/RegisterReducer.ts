import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import { httpClient } from "../../util/Config";
import { message } from "antd";

interface RegisterState {
  loading: boolean;
  error: string | null;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
};

const RegisterReducer = createSlice({
  name: "RegisterReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRegisterError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setRegisterError } = RegisterReducer.actions;
export default RegisterReducer.reducer;

export const RegisterThunk = (registerdata: any, navigate: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setRegisterError(null));

      const result = await httpClient.post(
        "/QuanLyNguoiDung/DangKy",
        registerdata,
      );

      message.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error: any) {
      const errMsg = error.response?.data?.content || "Đăng ký thất bại!";

      dispatch(setRegisterError(errMsg));
    } finally {
      dispatch(setLoading(false)); 
    }
  };
};
