import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import { httpClient } from "../../util/Config";

export interface UserToEnroll {
  taiKhoan: string;
  hoTen?: string;
  biDanh?: string;
}

interface GhiDanhState {
  usersToEnroll: UserToEnroll[]; // Chưa ghi danh
  usersPending: UserToEnroll[];  // Chờ xét duyệt
  usersEnrolled: UserToEnroll[]; // Đã ghi danh
  loading: boolean;
  error: string | null;
}

const initialState: GhiDanhState = {
  usersToEnroll: [],
  usersPending: [],
  usersEnrolled: [],
  loading: false,
  error: null,
};

const CYBERSOFT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MSIsIkhldEhhblN0cmluZyI6IjAyLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4ODMwNzIwMDAwMCIsIm5iZiI6MTc1OTk0MjgwMCwiZXhwIjoxNzg4NDU0ODAwfQ.3f2gLYDZla_lDH4GWmfgSe9Il_QHrpoHIWhW6FSKTi8";

const GhiDanhKhoaHocSlice = createSlice({
  name: "GhiDanhKhoaHoc",
  initialState,
  reducers: {
    setUsersToEnroll: (state, action: PayloadAction<UserToEnroll[]>) => {
      state.usersToEnroll = action.payload;
    },
    setUsersPending: (state, action: PayloadAction<UserToEnroll[]>) => {
      state.usersPending = action.payload;
    },
    setUsersEnrolled: (state, action: PayloadAction<UserToEnroll[]>) => {
      state.usersEnrolled = action.payload;
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

export const {
  setUsersToEnroll,
  setUsersPending,
  setUsersEnrolled,
  setLoading,
  setError,
} = GhiDanhKhoaHocSlice.actions;
export default GhiDanhKhoaHocSlice.reducer;


const getToken = () => JSON.parse(localStorage.getItem("userLogin") || "{}")?.accessToken;




export const loadUsersToEnrollThunk = (maKhoaHoc: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const token = getToken();
    const res = await httpClient.post(
      "/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh",
      { maKhoaHoc },
      { headers: { Authorization: `Bearer ${token}`, TokenCybersoft: CYBERSOFT_TOKEN } }
    );
    dispatch(setUsersToEnroll(res.data?.content || res.data || []));
  } catch (err: any) {
    dispatch(setError(err.message || "Load users to enroll failed"));
  } finally {
    dispatch(setLoading(false));
  }
};


export const loadUsersEnrolledThunk = (maKhoaHoc: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const token = getToken();
    const res = await httpClient.post(
      "/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc",
      { maKhoaHoc },
      { headers: { Authorization: `Bearer ${token}`, TokenCybersoft: CYBERSOFT_TOKEN } }
    );
    dispatch(setUsersEnrolled(res.data?.content || res.data || []));
  } catch (err: any) {
    dispatch(setError(err.message || "Load enrolled users failed"));
  } finally {
    dispatch(setLoading(false));
  }
};


export const loadUsersPendingThunk = (maKhoaHoc: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const token = getToken();
    const res = await httpClient.post(
      "/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet",
      { maKhoaHoc },
      { headers: { Authorization: `Bearer ${token}`, TokenCybersoft: CYBERSOFT_TOKEN } }
    );
    dispatch(setUsersPending(res.data?.content || res.data || []));
  } catch (err: any) {
    dispatch(setError(err.message || "Load pending users failed"));
  } finally {
    dispatch(setLoading(false));
  }
};


export const confirmEnrollThunk = (maKhoaHoc: string, taiKhoan: string) => async (dispatch: AppDispatch) => {
  try {
    const token = getToken();
    await httpClient.post(
      "/QuanLyKhoaHoc/GhiDanhKhoaHoc",
      { maKhoaHoc, taiKhoan },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    dispatch(loadUsersPendingThunk(maKhoaHoc));
    dispatch(loadUsersEnrolledThunk(maKhoaHoc));
  } catch (err: any) {
    dispatch(setError(err.message || "Confirm enroll failed"));
  }
};


export const cancelEnrollThunk = (maKhoaHoc: string, taiKhoan: string) => async (dispatch: AppDispatch) => {
  try {
    const token = getToken();
    await httpClient.post(
      "/QuanLyKhoaHoc/HuyGhiDanh",
      { maKhoaHoc, taiKhoan },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // Refresh lại 2 bảng
    dispatch(loadUsersPendingThunk(maKhoaHoc));
    dispatch(loadUsersEnrolledThunk(maKhoaHoc));
  } catch (err: any) {
    dispatch(setError(err.message || "Cancel enroll failed"));
  }
};