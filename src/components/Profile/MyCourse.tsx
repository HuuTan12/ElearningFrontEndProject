import React, { useState } from 'react';
import { useAppDispatch } from '../../Hooks/useRedux';
import { getHuyDangKiKhoaHocThunk } from '../../redux/reducer/DanhMucKhoaHocReducer';

interface Props {
  userProfile: any; // Nhận dữ liệu từ Profile.tsx truyền xuống
}

const MyCourse: React.FC<Props> = ({ userProfile }) => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  // Lấy danh sách khóa học từ dữ liệu profile
  const listCourse = userProfile?.chiTietKhoaHocGhiDanh || [];

  // Logic tìm kiếm tại chỗ (Search Bar)
  const filteredCourses = listCourse.filter((item: any) =>
    item.tenKhoaHoc?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-course-container">
      {/* Thanh tìm kiếm bên phải như wireframe */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Khóa học của tôi</h3>
        <div className="input-group w-50 shadow-sm">
          <input 
            type="text" 
            className="form-control border-0" 
            placeholder="Tìm khóa học..." 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="input-group-text bg-white border-0"><i className="fa fa-search"></i></span>
        </div>
      </div>

      {/* Danh sách khóa học */}
      <div className="row g-3">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((item: any) => (
            <div className="col-12" key={item.maKhoaHoc}>
              <div className="card border-0 shadow-sm overflow-hidden d-flex flex-row" style={{ borderRadius: '15px' }}>
                <img 
                  src={item.hinhAnh} 
                  alt={item.tenKhoaHoc} 
                  style={{ width: '180px', height: '120px', objectFit: 'cover' }} 
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="fw-bold mb-0">{item.tenKhoaHoc}</h5>
                  <div className="text-end">
                    <button 
                      className="btn btn-outline-danger btn-sm px-4 rounded-pill"
                      onClick={() => {
                        if(window.confirm("Bạn muốn hủy khóa học này?")) {
                          dispatch(getHuyDangKiKhoaHocThunk(item.maKhoaHoc, userProfile.taiKhoan ));
                        }
                      }}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5 bg-light rounded-3">
            <p className="text-muted">Không tìm thấy khóa học nào.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourse;