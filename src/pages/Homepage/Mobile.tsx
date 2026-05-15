// src/pages/Homepage/Mobile.tsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useHomePage from "./useHomePage";

const MobileHome: React.FC = () => {
  const { courseList, loading, error } = useHomePage();
 const navigate  = useNavigate()
  return (
    <div className="container">
      <h3>Courses</h3>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="d-flex flex-column gap-3">
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
                      <button className="btn btn-primary btn-sm" >Đăng ký</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default MobileHome;