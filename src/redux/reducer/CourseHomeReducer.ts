import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Course } from '../../Types';
import { httpClient } from '../../util/Config';
import type { AppDispatch } from '../store';

interface CourseHomeState {
  courseList: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseHomeState = {
  courseList: [],
  loading: false,
  error: null
};

const courseSlice = createSlice({
  name: 'CourseHomeReducer',
  initialState,
  reducers: {
    setCourseList: (state, action: PayloadAction<Course[]>) => {
      state.courseList = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { setCourseList, setLoading, setError } = courseSlice.actions
export default courseSlice.reducer


export const getCourseHomePageApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const result = await httpClient.get('/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01');
      dispatch(setCourseList(result.data));
    } catch (error: any) {
      dispatch(setError(error.message || 'Có lỗi xảy ra khi tải dữ liệu'));
      console.error(error);
    }
  }
}