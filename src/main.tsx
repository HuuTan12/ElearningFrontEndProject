import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import HomeTemplates from "./Templates/HomeTemplates";
import UserTemplates from "./Templates/UserTemplates";
import "./assets/sass/index.scss";

import ChiTietKhoaHoc from "./pages/ChiTietKhoaHoc";
import DanhSachKhoaHoc from "./pages/DanhSachKhoaHoc";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import TimKiemKhoaHoc from "./pages/TimKiemKhoaHoc";
import { store } from "./redux/store";

import AdminTemplates from "./Templates/AdminTemplates";
import QuanLyNguoiDung from "./pages/Admin/QuanLyNguoiDung";

import QuanLyKhoaHoc from "./pages/Admin/QuanLyKhoaHoc";



createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<HomeTemplates />}>
          <Route index element={<HomePage />} />
          <Route path="danhsachkhoahoc" element={<DanhSachKhoaHoc />} />
          <Route
            path="danhmuckhoahoc/:maDanhMuc"
            element={<DanhSachKhoaHoc />}
          />
          <Route path="timkiemkhoahoc/:tuKhoa" element={<TimKiemKhoaHoc />} />
          <Route
            path="chitietkhoahoc/:maKhoaHoc"
            element={<ChiTietKhoaHoc />}
          />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route element={<UserTemplates />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/admin" element={<AdminTemplates />}>
          <Route index element={<QuanLyNguoiDung />} />
          <Route path="quanlynguoidung" element={<QuanLyNguoiDung />} />
          <Route path="quanlykhoahoc" element={<QuanLyKhoaHoc />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Provider>
  </BrowserRouter>,
);
