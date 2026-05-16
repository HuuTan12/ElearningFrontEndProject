import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../Hooks/useRedux';
import { getDangKyKhoaHocThunk } from "../redux/reducer/DanhMucKhoaHocReducer";

import type { Course } from '../Types';

interface Props {
  course: Course;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  

  const handleRegisterCourse = async () => {
  const userLocal = localStorage.getItem("userLogin");

 
  if (!userLocal) {
    alert('Vui lòng đăng nhập để đăng ký khóa học');
    navigate("/login");
    return; 
  }
  
  try {
    const userObj = JSON.parse(userLocal);
    const taiKhoan = userObj.taiKhoan;

  
    await dispatch(getDangKyKhoaHocThunk(course.maKhoaHoc, taiKhoan));

  
    navigate("/profile?tab=courses");
    
  } catch (error) {
    console.error("Lỗi parse JSON hoặc lỗi hệ thống:", error);
  }
};

  return (
    <div className="col-12 col-sm-6 col-md-4 mb-4"> 
     
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