import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useAppDispatch } from "../../Hooks/useRedux";
import {
  loadNotRegisteredCourses,
  loadCoursesPendingApproval,
  loadCoursesApproved,
  registerCourse,
  cancelCourse
} from "../../redux/reducer/GhiDanhReducer";
import type { ThemNguoiDung } from "../../Types";

interface Props {
  show: boolean;
  onClose: () => void;
  user: ThemNguoiDung | null;
}

const PopupGhiDanh: React.FC<Props> = ({ show, onClose, user }) => {
  const dispatch = useAppDispatch();

  const coursesNotRegister = useSelector((state: RootState) => state.GhiDanhReducer.coursesNotRegister);
  const coursesPending = useSelector((state: RootState) => state.GhiDanhReducer.coursesPending);
  const coursesApproved = useSelector((state: RootState) => state.GhiDanhReducer.coursesApproved);

  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    if (show && user) {
      dispatch(loadNotRegisteredCourses(user.taiKhoan));
      dispatch(loadCoursesPendingApproval(user.taiKhoan));
      dispatch(loadCoursesApproved(user.taiKhoan));
      setSelectedCourse("");
    }
  }, [show, user, dispatch]);

  if (!show || !user) return null;

  const token = localStorage.getItem("token") || "";

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.25)" }}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content p-4 rounded-4 shadow-lg">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Ghi danh khóa học cho: {user.taiKhoan}</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="mb-4">
            <label>Chọn khóa học</label>
            <div className="d-flex gap-2">
              <select className="form-select" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                <option value="">--- Chọn khóa học ---</option>
                {coursesNotRegister.map(course => (
                  <option key={course.maKhoaHoc} value={course.maKhoaHoc}>{course.tenKhoaHoc}</option>
                ))}
              </select>
              <button className="btn btn-dark" onClick={() => {
                if (!selectedCourse) return alert("Chọn khóa học!");
                dispatch(registerCourse(user.taiKhoan, selectedCourse));
                setSelectedCourse("");
              }}>Ghi danh</button>
            </div>
          </div>

          <h6>Khóa học chờ xác thực</h6>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên khóa học</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {coursesPending.map((item, idx) => (
                <tr key={`${item.maKhoaHoc}-${idx}`}>
                  <td>{idx + 1}</td>
                  <td>{item.tenKhoaHoc}</td>
                  <td>
                    <button
  className="btn btn-success btn-sm me-2"
  onClick={() => dispatch(registerCourse(user.taiKhoan, item.maKhoaHoc))}
>
  Xác thực
</button>

<button
  className="btn btn-outline-danger btn-sm"
  onClick={() => dispatch(cancelCourse(user.taiKhoan, item.maKhoaHoc, token))}
>
  Hủy
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h6>Khóa học đã ghi danh</h6>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên khóa học</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {coursesApproved.map((item, idx) => (
                <tr key={`${item.maKhoaHoc}-${idx}`}>
                  <td>{idx + 1}</td>
                  <td>{item.tenKhoaHoc}</td>
                  <td>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => dispatch(cancelCourse(user.taiKhoan, item.maKhoaHoc, token))}>Hủy</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PopupGhiDanh;