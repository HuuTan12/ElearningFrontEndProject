import React from 'react';
import { useNavigate } from 'react-router-dom';
// Import type từ file Types của bạn
import { useAppDispatch, useAppSelector } from '../Hooks/useRedux';
import { getDangKyKhoaHocThunk } from "../redux/reducer/DanhMucKhoaHocReducer";
import type { RootState } from '../redux/store';
import type { Course } from '../Types';

interface Props {
  course: Course;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {userLogin} = useAppSelector((state: RootState) => state.LoginReducer);

  const handleRegisterCourse = async () => {
  const userLocal = localStorage.getItem("userLogin");

  // 1. Kiểm tra nếu CHƯA đăng nhập
  if (!userLocal) {
    alert('Vui lòng đăng nhập để đăng ký khóa học');
    navigate("/login");
    return; // Dừng hàm tại đây
  }
  // 2. Nếu ĐÃ đăng nhập (nghĩa là userLocal có dữ liệu)
  try {
    const userObj = JSON.parse(userLocal);
    const taiKhoan = userObj.taiKhoan;

    // 3. Gọi dispatch và đợi nó chạy xong
    // Truyền thêm navigate vào nếu Thunk của bạn cần dùng để chuyển trang
    await dispatch(getDangKyKhoaHocThunk(course.maKhoaHoc, taiKhoan));

    // 4. Chuyển về đúng tab khóa học để thấy kết quả ngay
    navigate("/profile?tab=courses");
    
  } catch (error) {
    console.error("Lỗi parse JSON hoặc lỗi hệ thống:", error);
  }
};

  return (
    <div className="col-12 col-sm-6 col-md-4 mb-4"> 
      {/* Thêm col-12 và col-sm-6 để xử lý Responsive chuẩn iPhone/iPad  */}
      <div className="card h-100 p-3 shadow-sm">
        <img
          src={course.hinhAnh}
          alt={course.tenKhoaHoc}
          className="card-img-top mb-3"
          style={{ height: '180px', objectFit: 'cover', cursor: 'pointer' }}
          onClick={() => navigate(`/chitietkhoahoc/${course.maKhoaHoc}`)}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate">{course.tenKhoaHoc}</h5>
          <p className="card-text text-muted">
            {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
          </p>
          <div className="mt-auto">
            <p className="mb-1"><small>Lượt xem: {course.luotXem}</small></p>
            <p className="mb-3"><small>Người tạo: {course.nguoiTao?.hoTen}</small></p>
            <button 
              className="btn btn-success w-100"
              onClick={handleRegisterCourse}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;