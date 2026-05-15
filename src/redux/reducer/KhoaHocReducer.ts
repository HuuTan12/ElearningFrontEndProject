import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { httpClient } from "../../util/Config";


import type  { Course } from "../../Types"; 
import type { AppDispatch } from "../store";


interface KhoaHocState {
  danhSachKhoaHoc: Course[]; 
}

const initialState: KhoaHocState = {
  danhSachKhoaHoc: [],
};


const KhoaHocReducer = createSlice({
  name: "KhoaHocReducer",
  initialState,
  reducers: {
    
    setDanhSachKhoaHoc: (state, action: PayloadAction<Course[]>) => {
      state.danhSachKhoaHoc = action.payload;
    },
  },
});

export const { setDanhSachKhoaHoc } = KhoaHocReducer.actions;
export default KhoaHocReducer.reducer;



export const layDanhSachKhoaHocThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await httpClient.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01");
      dispatch(setDanhSachKhoaHoc(res.data));
    } catch (err: any) {
      
    }
  };
};

export const themKhoaHocThunk = (formData: FormData, onSuccess: () => void) => {
  return async (dispatch: AppDispatch) => {
    try {
      await httpClient.post("/QuanLyKhoaHoc/ThemKhoaHocUploadHinh", formData);
      message.success("Thêm khóa học thành công! 🎉");
      
      
      dispatch(layDanhSachKhoaHocThunk());
      
    
      onSuccess();

    } catch (err: any) {
     
      const errorMsg = typeof err.response?.data === 'string' ? err.response?.data : "Thêm khóa học thất bại!";
      message.error(errorMsg);
    }
  };
};