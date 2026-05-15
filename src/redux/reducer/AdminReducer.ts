import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThemNguoiDung } from "../../Types";
import { httpClient } from "../../util/Config";
import type { AppDispatch } from "../store";
import { message } from "antd";

interface AdminState {
  arrUser: ThemNguoiDung[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  arrUser: [],
  loading: false,
  error: null,
};

const AdminReducer = createSlice({
  name: "AdminReducer",

  initialState,

  reducers: {
    addUserAction: (state, action: PayloadAction<ThemNguoiDung>) => {
      state.arrUser.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    loadUsersAction: (state, action: PayloadAction<ThemNguoiDung[]>) => {
      state.arrUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { addUserAction, loadUsersAction, setLoading, setError, } = AdminReducer.actions;

export default AdminReducer.reducer;

export const loadUsersApiThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const result = await httpClient.get("/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
      dispatch(loadUsersAction(result.data));
    } catch (error: any) {
      dispatch(
        setError(
          error.response?.data ||
            error.response?.data ||
            error.message ||
            "Lấy danh sách người dùng thất bại"
        )
      );
    }
  };
}

export const addUserApiThunk = (user: ThemNguoiDung) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      await httpClient.post(
        "/QuanLyNguoiDung/ThemNguoiDung",
        user
      );

      dispatch(loadUsersApiThunk());

      message.success("Thêm người dùng thành công!");
    } catch (error: any) {
      dispatch(
        setError(
          error.response?.data ||
            error.response?.data ||
            error.message ||
            "Thêm người dùng thất bại"
        )
      );

      message.error(
        error.response?.data ||
          error.response?.data ||
          error.message ||
          "Thêm người dùng thất bại"
      );
    }
  };
};

export const deleteUserApiThunk = (taikhoan: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      await httpClient.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taikhoan}`);
       await dispatch(loadUsersApiThunk())
      message.success("Xóa người dùng thành công!");
    } catch (error: any) {
      dispatch(
        setError(
            error.response?.data ||
            error.message ||
            "Xóa người dùng thất bại"
        )
      );
    }
  };
};

export const updateUserApiThunk = (user: ThemNguoiDung) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      await httpClient.put(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        {
          taiKhoan: user.taiKhoan.trim(),
          matKhau: user.matKhau.trim(),
          hoTen: user.hoTen.trim(),
          soDT: user.soDT?.trim() || "0900000000",
          maNhom: "GP01",
          email: user.email.trim(),
          maLoaiNguoiDung: user.maLoaiNguoiDung,
        }
      );

      await dispatch(loadUsersApiThunk());

      message.success("Cập nhật người dùng thành công!");
    } catch (error: any) {
      const message =
        error.response?.data?.content ||
        error.response?.data ||
        error.message ||
        "Cập nhật người dùng thất bại";

      dispatch(setError(message));
      message.error(message);
    }
  };
};
