import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../../Types';
import { httpClient } from '../../util/Config';
import type { AppDispatch } from '../store';
import { getProfileThunk } from './LoginReducer';
import { message } from "antd";

interface DanhMucState {
  arrCategory: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: DanhMucState = {
  arrCategory: [],
  loading: false,
  error: null,
};


const DanhMucKhoaHocReducer = createSlice({
  name: 'DanhMucKhoaHocReducer',
  initialState,
  reducers: {
    setArrCategory: (state, action: PayloadAction<Category[]>) => {
      state.arrCategory = action.payload;
      state.loading = false;
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

export const { setArrCategory, setLoading, setError } =
  DanhMucKhoaHocReducer.actions;

export default DanhMucKhoaHocReducer.reducer;

export const getApiDanhMucKhoaHocThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const result = await httpClient.get<Category[]>(
        `/QuanLyKhoaHoc/LayDanhMucKhoaHoc`
      );

      await dispatch(setArrCategory(result.data));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
};

export const getDangKyKhoaHocThunk = (maKhoaHoc: string, taiKhoan: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      await httpClient.post('/QuanLyKhoaHoc/DangKyKhoaHoc', {
        maKhoaHoc,
        taiKhoan,
      });
      message.success('Đăng ký khóa học thành công');
      await dispatch(getProfileThunk());
    } catch (error: any) {
      const errorMsg = error.response?.data?.content || error.response?.data || 'Đăng ký khóa học thất bại';
      message.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const getHuyDangKiKhoaHocThunk = (maKhoaHoc: string, taiKhoan: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      await httpClient.post('/QuanLyKhoaHoc/HuyGhiDanh', {
        maKhoaHoc,
        taiKhoan,
      });
      message.success('Hủy đăng ký khóa học thành công');
      await dispatch(getProfileThunk());
    } catch (error: any) {
      const errorMsg = error.response?.data?.content || error.response?.data || 'Hủy đăng ký khóa học thất bại';
      message.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };
};