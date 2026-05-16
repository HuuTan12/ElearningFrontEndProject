import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import { httpClient } from "../../util/Config";
import type { CourseFormData } from "../../Types";
import { message } from "antd";

export interface Course {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  danhGia: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;

  nguoiTao: {
    taiKhoan: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    tenLoaiNguoiDung: string;
  };

  danhMucKhoaHoc: {
    maDanhMucKhoaHoc: string;
    tenDanhMucKhoaHoc: string;
  };
}

interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

const QuanLyKhoaHocReducer = createSlice({
  name: "QuanLyKhoaHocReducer",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
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
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter(
        (course) => course.maKhoaHoc !== action.payload,
      );
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      state.courses = state.courses.map((course) =>
        course.maKhoaHoc === action.payload.maKhoaHoc ? action.payload : course,
      );
    },
  },
});

export const {
  setCourses,
  setLoading,
  setError,
  addCourse,
  deleteCourse,
  updateCourse,
} = QuanLyKhoaHocReducer.actions;

export default QuanLyKhoaHocReducer.reducer;


export const loadCoursesThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");
      const token = userLogin.accessToken;

      const result = await httpClient.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc", {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(setCourses(result.data));
    } catch (err: any) {
      dispatch(setError(err.message || "Load khóa học thất bại"));
      console.error(err);
    }
  };
};


export const addCourseThunk = (courseForm: CourseFormData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");

      const token = userLogin.accessToken;

      const data = {
        maKhoaHoc: courseForm.maKhoaHoc,
        tenKhoaHoc: courseForm.tenKhoaHoc,
        moTa: courseForm.moTa,

        luotXem: Number(courseForm.luotXem),

        danhGia: Number(courseForm.danhGia),

        
        hinhAnh:
          courseForm.hinhAnh instanceof File ? courseForm.hinhAnh.name : "",

        maNhom: "GP01",

        ngayTao: courseForm.ngayTao,

        maDanhMucKhoaHoc: courseForm.danhMuc,

        taiKhoanNguoiTao: userLogin.taiKhoan,
      };

      await httpClient.post("/QuanLyKhoaHoc/ThemKhoaHoc", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(loadCoursesThunk());

      message.success("Thêm khóa học thành công");
    } catch (err: any) {
  

      dispatch(
        setError(
          err.response?.data?.message ||
            err.message ||
            "Thêm khóa học thất bại",
        ),
      );

      message.error("Thêm khóa học thất bại");
    }
  };
};
export const deleteCourseThunk = (maKhoaHoc: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");

      const token = userLogin.accessToken;

      await httpClient.delete(
        `/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      dispatch(deleteCourse(maKhoaHoc));
      dispatch(setLoading(false));

      message.success("Xóa khóa học thành công");
    } catch (error: any) {
      console.log(error.response?.data);

      message.error(error.response?.data || "Xóa khóa học thất bại");
    }
  };
};
export const updateCourseThunk = (courseForm: CourseFormData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const userLogin = JSON.parse(localStorage.getItem("userLogin") || "{}");

      const token = userLogin.accessToken;

      const formData = new FormData();

      formData.append("maKhoaHoc", courseForm.maKhoaHoc);
      formData.append("tenKhoaHoc", courseForm.tenKhoaHoc);
      formData.append("moTa", courseForm.moTa);

      formData.append("luotXem", courseForm.luotXem.toString());

      formData.append("danhGia", courseForm.danhGia.toString());

      formData.append("maNhom", "GP01");

      formData.append(
        "ngayTao",
        new Date(courseForm.ngayTao).toLocaleDateString("vi-VN"),
      );

      formData.append("maDanhMucKhoaHoc", courseForm.danhMuc);

      formData.append("taiKhoanNguoiTao", userLogin.taiKhoan);

      if (courseForm.hinhAnh instanceof File) {
        formData.append("hinhAnh", courseForm.hinhAnh, courseForm.hinhAnh.name);
      } else {
        formData.append("hinhAnh", "");
      }

      await httpClient.post("/QuanLyKhoaHoc/CapNhatKhoaHocUpload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(loadCoursesThunk());

      message.success("Cập nhật khóa học thành công");
    } catch (error: any) {
      console.log(error.response?.data);

      message.error(error.response?.data || "Cập nhật khóa học thất bại");
    }
  };
};
