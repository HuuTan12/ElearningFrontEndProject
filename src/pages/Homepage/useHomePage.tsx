// src/pages/Homepage/useHomePage.tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/useRedux";
import { getCourseHomePageApi } from "../../redux/reducer/CourseHomeReducer";

const useHomePage = () => {
  const dispatch = useAppDispatch();
  const { courseList, loading, error } = useAppSelector(
    (state) => state.CourseHomeReducer
  );

  useEffect(() => {
    dispatch(getCourseHomePageApi());
  }, [dispatch]);

  return { courseList, loading, error };
};

export default useHomePage;