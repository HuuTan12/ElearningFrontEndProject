import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Hooks/useRedux";
import { getDangKyKhoaHocThunk } from "../redux/reducer/DanhMucKhoaHocReducer";
import { getApiChiTietKhoaHocThunk } from "../redux/reducer/DanhSachKhoaHocReducer";
import type { RootState } from "../redux/store";

const ChiTietKhoaHoc = () => {
  const { maKhoaHoc } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { courseDetail, loading, error } = useAppSelector(
    (state: RootState) => state.DanhSachKhoaHocReducer
  );

  const { userLogin } = useAppSelector((state: RootState) => state.LoginReducer);

  const handleRegisterCourse = async () => {
    if (!userLogin || !userLogin.taiKhoan) {
      alert('Vui lòng đăng nhập để đăng ký khóa học');
      navigate("/login");
      return;
    }
    if (courseDetail) {
      await dispatch(getDangKyKhoaHocThunk(courseDetail.maKhoaHoc, userLogin.taiKhoan));
      navigate("/profile");
    }
  };

  useEffect(() => {
    if (maKhoaHoc) {
      dispatch(getApiChiTietKhoaHocThunk(maKhoaHoc));
    }
  }, [maKhoaHoc, dispatch]);

  if (loading) return <p className="container py-5">Loading...</p>;

  if (error) return <p className="container py-5 text-danger">Không tìm thấy khóa học chi tiết</p>;

  if (!courseDetail) return null;

  return (
    <div className="container py-4">
      <h1 className="py-3 bg-dark text-white text-center">
        Chi tiết khóa học
      </h1>

      <div className="row mt-4">
        <div className="col-md-5">
          <img
            src={courseDetail.hinhAnh}
            alt={courseDetail.tenKhoaHoc}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-7">
          <h2>{courseDetail.tenKhoaHoc}</h2>

          <p>{courseDetail.moTa}</p>

          <p>
            <strong>Danh mục:</strong>{" "}
            {courseDetail.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
          </p>

          <p>
            <strong>Lượt xem:</strong> {courseDetail.luotXem}
          </p>

          <p>
            <strong>Số học viên:</strong> {courseDetail.soLuongHocVien}
          </p>

          <p>
            <strong>Ngày tạo:</strong> {courseDetail.ngayTao}
          </p>

          <p>
            <strong>Người tạo:</strong> {courseDetail.nguoiTao?.hoTen}
          </p>

          <button 
            className="btn btn-success"
            onClick={handleRegisterCourse}
          >
            Đăng ký khóa học
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChiTietKhoaHoc;