import { useEffect } from 'react';
import { getApiDanhSachKhoaHocThunk } from '../redux/reducer/DanhSachKhoaHocReducer';
import type { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../Hooks/useRedux';
import { useParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
const DanhSachKhoaHoc = () => {
  const { arrList, loading, error } = useAppSelector(
    (state: RootState) => state.DanhSachKhoaHocReducer
  );
  const { maDanhMuc } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (maDanhMuc) {
    dispatch(getApiDanhSachKhoaHocThunk(maDanhMuc));
    }
  }, [maDanhMuc, dispatch]);

  return (
    <div className="container py-4">
      <div className="p-4 bg-dark text-white text-center w-100">
        Lập trình frontend
      </div>

      <h2 className="my-4">Danh mục khóa học phổ biến</h2>

      {loading && <p>Loading...</p>}

      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {arrList?.slice(0, 8).map((course) => (
          <CourseCard key={course.maKhoaHoc} course={course} />
        ))}
      </div>
    </div>
  );
};

export default DanhSachKhoaHoc;