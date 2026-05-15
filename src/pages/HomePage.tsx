import { useNavigate } from 'react-router-dom';
import { useCourseHomeApi } from '../Api/CourseHomeApi';
import HeroBanner from '../components/HeroBanner';
import { useAppDispatch, useAppSelector } from '../Hooks/useRedux';
import { getDangKyKhoaHocThunk } from '../redux/reducer/DanhMucKhoaHocReducer';
import type { RootState } from '../redux/store';
import type { Course } from '../Types';

const HomePage = () => {
  const { courseList, loading, error } = useCourseHomeApi();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userLogin } = useAppSelector((state: RootState) => state.LoginReducer);

  const handleRegisterCourse = async (course: Course) => {
    if (!userLogin || !userLogin.taiKhoan) {
      alert('Vui lòng đăng nhập để đăng ký khóa học');
      navigate("/login");
      return;
    }
    await dispatch(getDangKyKhoaHocThunk(course.maKhoaHoc, userLogin.taiKhoan));
    navigate("/profile");
  };
  
  return (
    <div>
      <HeroBanner />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div className="container py-5">
          <h2>Danh sách các khóa học mới nhất</h2>
          <div className="row">
            {courseList.slice(0, 8).map((course: any) => (
              <div className="col-md-4 mb-4" key={course.maKhoaHoc}>
                <div className="card h-100">
                  <img
                    src={course.hinhAnh}
                    className="card-img-top"
                    alt={course.tenKhoaHoc}
                    style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => navigate(`/chitietkhoahoc/${course.maKhoaHoc}`)}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{course.tenKhoaHoc}</h5>
                    <p className="card-text flex-grow-1">{course.moTa}</p>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <small className="text-muted">
                        Views {course.luotXem} 
                      </small>
                      <button className="btn btn-primary btn-sm" onClick={() => handleRegisterCourse(course)}>Đăng ký</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage