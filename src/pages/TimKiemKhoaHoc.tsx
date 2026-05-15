import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Hooks/useRedux";
import { getApiSearchThunk } from "../redux/reducer/DanhSachKhoaHocReducer";
import type { Course } from "../Types";

const TimKiemKhoaHoc = () => {
  const { tuKhoa } = useParams();
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { arrList, loading, error } = useAppSelector(
    (state) => state.DanhSachKhoaHocReducer,
  );

  useEffect(() => {
    if (tuKhoa) {
      dispatch(getApiSearchThunk(tuKhoa));
      setCurrentPage(1);
    }
  }, [tuKhoa, dispatch]);

  const totalPages = Math.ceil(arrList.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = arrList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container py-4">
      <h3 className="mb-4">
        Tìm thấy {arrList.length} khóa học: {tuKhoa}
      </h3>

      {loading && <p>Loading...</p>}

      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && arrList.length === 0 && (
        <p className="text-danger">Không tìm thấy khóa học nào.</p>
      )}

      {currentData.map((course:Course) => (
        <div
          key={course.maKhoaHoc}
          className="d-flex align-items-center justify-content-between border-top py-3 gap-3"
        >
          <img
            src={course.hinhAnh}
            alt={course.tenKhoaHoc}
            style={{
              width: "170px",
              height: "95px",
              objectFit: "cover",
            }}
            className="me-3"
          />

          <div className="flex-grow-1">
            <h5 className="fw-bold mb-2">{course.tenKhoaHoc}</h5>

            <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
              {course.moTa?.length > 120
                ? course.moTa.slice(0, 120) + "..."
                : course.moTa}
            </p>

            <div className="text-warning">
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star-half-alt" />

              <span className="text-muted ms-2" style={{ fontSize: "13px" }}>
                4.3 ({course.soLuongHocVien} học viên)
              </span>
            </div>
          </div>

          <div className="text-end ms-3">
            <NavLink
              to={`/chitietkhoahoc/${(course.maKhoaHoc)}`}
              className="btn btn-primary btn-sm"
            >
              Xem chi tiết
            </NavLink>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="mt-4 text-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="btn btn-link"
          >
            ← prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`btn btn-sm mx-1 ${
                currentPage === index + 1
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn btn-link"
          >
            next →
          </button>
        </div>
      )}
    </div>
  );
};

export default TimKiemKhoaHoc;
