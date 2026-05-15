import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Course } from '../../Types';
import { httpClient } from '../../util/Config';
import type { AppDispatch } from '../store';

interface DanhMucState {
  arrList: Course[];
  courseDetail: Course | null;
  loading: boolean;
  error: string | null;
}

const initialState: DanhMucState = {
  arrList: [],
  courseDetail: null,
  loading: false,
  error: null,
};

const DanhSachKhoaHocReducer = createSlice({
  name: 'DanhSachKhoaHocReducer',
  initialState,
  reducers: {
      setArrList: (state, action: PayloadAction<Course[]>) => {
        state.arrList = action.payload;
        
        state.loading = false;
        state.error = null;
      },
     setCourseDetail: (state, action: PayloadAction<Course>) => {
        state.courseDetail = action.payload;
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

export const { setArrList,setCourseDetail, setLoading, setError } =
 DanhSachKhoaHocReducer.actions;

export default DanhSachKhoaHocReducer.reducer;

export const getApiDanhSachKhoaHocThunk = (maDanhMuc: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const result = await httpClient.get<Course[]>(
        `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`
      );

      dispatch(setArrList(result.data));
    } catch (error: any) {
      dispatch(setError(error.message || 'Có lỗi xảy ra khi tải dữ liệu'));
      console.error(error);
    }
  };
};

export const getApiSearchThunk = (keyword:string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true))
      const result = await httpClient.get<Course[]> (`/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${keyword}&MaNhom=GP01`)
       dispatch(setArrList(result.data));
      

    } catch(error: any){
       dispatch(setError(error.message));
    }

  }
}

export const getApiChiTietKhoaHocThunk = (maKhoaHoc: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const result = await httpClient.get<Course>(
        `/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`
      );

      dispatch(setCourseDetail(result.data));
    } catch (error: any) {
      dispatch(setError(error.response?.data || error.message));
    }
  };
};
