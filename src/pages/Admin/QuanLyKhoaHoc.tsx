import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/useRedux";
import FormKhoaHoc from "./FormKhoaHoc";
import PopupGhiDanhKhoaHoc from "./PopupGhiDanhKhoaHoc";
import type { CourseFormData } from "../../Types";
import {
  addCourseThunk,
  loadCoursesThunk,
  deleteCourseThunk,
  type Course,
} from "../../redux/reducer/QuanLyKhoaHocReducer";

const QuanLyKhoaHoc: React.FC = () => {
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.QuanLyKhoaHocReducer);

  const [showAddCourse, setShowAddCourse] = useState(false);

  useEffect(() => {
    dispatch(loadCoursesThunk());
  }, [dispatch]);

  const [showEnrollPopup, setShowEnrollPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  const handleAddCourse = (data: CourseFormData) => {
    dispatch(addCourseThunk(data));
    setShowAddCourse(false);
  };
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  return (
    <div className="container mt-4">
      <h3>Quản lý khóa học</h3>

      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Tìm kiếm khóa học..."
        />
        <button
          className="btn btn-success"
          onClick={() => setShowAddCourse(true)}
        >
          Thêm khóa học
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>STT</th>
              <th>Mã khóa học</th>
              <th>Tên khóa học</th>
              <th>Hình ảnh</th>
              <th>Lượt xem</th>
              <th>Người tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course: Course, idx) => (
              <tr key={course.maKhoaHoc}>
                <td>{idx + 1}</td>
                <td>{course.maKhoaHoc}</td>
                <td>{course.tenKhoaHoc}</td>
                <td>
                  {course.hinhAnh ? (
                    <img
                      src={course.hinhAnh}
                      alt={course.tenKhoaHoc}
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                  ) : (
                    "--"
                  )}
                </td>
                <td>{course.luotXem}</td>
               <td>{course.nguoiTao?.hoTen}</td>
                <td className="d-flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => {
                      
                      setSelectedCourse(course);
                      setShowEnrollPopup(true);
                    }}
                  >
                    Ghi danh
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      setEditingCourse(course);
                      setShowAddCourse(true);
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      dispatch(deleteCourseThunk(course.maKhoaHoc))
                    }
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddCourse && (
        <FormKhoaHoc
          onClose={() => setShowAddCourse(false)}
          onSubmitCourse={handleAddCourse}
          editingCourse={editingCourse}
        />
      )}
      
      
      {showEnrollPopup && selectedCourse && (
        <PopupGhiDanhKhoaHoc
          maKhoaHoc={selectedCourse.maKhoaHoc} 
          onClose={() => {
            setShowEnrollPopup(false);
            setSelectedCourse(null); 
          }}
        />
      )}
    </div>
  );
};

export default QuanLyKhoaHoc;