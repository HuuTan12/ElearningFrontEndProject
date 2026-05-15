import { useEffect } from 'react';
import { getCourseHomePageApi } from '../redux/reducer/CourseHomeReducer';
import type { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../Hooks/useRedux';

export const useCourseHomeApi = () => {
  const dispatch = useAppDispatch();
  const { courseList, loading, error } = useAppSelector(
    (state: RootState) => state.CourseHomeReducer
  );

  useEffect(() => {
    dispatch(getCourseHomePageApi());
  }, [dispatch]);

  return { courseList, loading, error };
};