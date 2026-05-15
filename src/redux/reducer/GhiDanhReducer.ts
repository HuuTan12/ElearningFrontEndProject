import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
import { httpClient } from "../../util/Config";
import type { AppDispatch } from "../store";
import { message } from "antd";

interface Course {
  maKhoaHoc: string;
  tenKhoaHoc: string;
}

interface CourseState {
  coursesNotRegister: Course[];
  coursesPending: Course[];
  coursesApproved: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  coursesNotRegister: [],
  coursesPending: [],
  coursesApproved: [],
  loading: false,
  error: null
};

const GhiDanhReducer = createSlice({
  name: 'GhiDanhReducer',
  initialState,
  reducers: {
    setNotRegisteredCourses: (state, action: PayloadAction<Course[]>) => {
      state.coursesNotRegister = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCoursesPending: (state, action: PayloadAction<Course[]>) => {
      state.coursesPending = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCoursesApproved: (state, action: PayloadAction<Course[]>) => {
      state.coursesApproved = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  setNotRegisteredCourses,
  setCoursesPending,
  setCoursesApproved,
  setLoading,
  setError
} = GhiDanhReducer.actions;

export default GhiDanhReducer.reducer;


export const loadNotRegisteredCourses = (taiKhoan: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const result = await httpClient.post("/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh", { taiKhoan });
    dispatch(setNotRegisteredCourses(result.data));
  } catch (error: any) {
    dispatch(setError(error.response?.data || error.message || "Load khóa học chưa ghi danh thất bại"));
  }
};


export const loadCoursesPendingApproval = (taiKhoan: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const result = await httpClient.post("/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet", { taiKhoan });
    dispatch(setCoursesPending(result.data));
  } catch (error: any) {
    dispatch(setError(error.response?.data || error.message || "Load khóa học chờ xét duyệt thất bại"));
  }
};


export const loadCoursesApproved = (taiKhoan: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const result = await httpClient.post("/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", { taiKhoan });
    dispatch(setCoursesApproved(result.data));
  } catch (error: any) {
    dispatch(setError(error.response?.data || error.message || "Load khóa học đã ghi danh thất bại"));
  }
};


export const registerCourse = (taiKhoan: string, maKhoaHoc: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    await httpClient.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", { taiKhoan, maKhoaHoc });
    message.success("Xác nhận thành công!");
    await dispatch(loadNotRegisteredCourses(taiKhoan));
    await dispatch(loadCoursesPendingApproval(taiKhoan));
    await dispatch(loadCoursesApproved(taiKhoan));
  } catch (error: any) {
    const message = error.response?.data || error.message || "Ghi danh thất bại";
    dispatch(setError(message));
    message(message);
  }
};


export const cancelCourse = (taiKhoan: string, maKhoaHoc: string, token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    await httpClient.post("/QuanLyKhoaHoc/HuyGhiDanh", { taiKhoan, maKhoaHoc }, {
      headers: { Authorization: "Bearer " + token }
    });
    message.error("Hủy đăng ký thành công!");
    await dispatch(loadNotRegisteredCourses(taiKhoan));
    await dispatch(loadCoursesPendingApproval(taiKhoan));
    await dispatch(loadCoursesApproved(taiKhoan));
  } catch (error: any) {
    const message = error.response?.data || error.message || "Hủy đăng ký thất bại";
    dispatch(setError(message));
    message(message);
  }
};