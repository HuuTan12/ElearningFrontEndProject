import { configureStore } from "@reduxjs/toolkit";
import CourseHomeReducer from "./reducer/CourseHomeReducer";
import DanhSachKhoaHocReducer from "./reducer/DanhSachKhoaHocReducer";
import DanhMucKhoaHocReducer from"./reducer/DanhMucKhoaHocReducer"
import RegisterReducer from"./reducer/RegisterReducer"
import LoginReducer from "../redux/reducer/LoginReducer"
import AdminReducer from "./reducer/AdminReducer";
import KhoaHocReducer from "./reducer/KhoaHocReducer";
import GhiDanhReducer from "./reducer/GhiDanhReducer";
import QuanLyKhoaHocReducer from "./reducer/QuanLyKhoaHocReducer"
import GhiDanhKhoaHocReducer from "./reducer/GhiDanhKhoaHocReducer"
export const store = configureStore({
  reducer: {
    CourseHomeReducer,
    DanhSachKhoaHocReducer,
    DanhMucKhoaHocReducer,
    RegisterReducer,
    LoginReducer,
    AdminReducer,
    KhoaHocReducer,
    GhiDanhReducer,
    QuanLyKhoaHocReducer,
    GhiDanhKhoaHocReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
