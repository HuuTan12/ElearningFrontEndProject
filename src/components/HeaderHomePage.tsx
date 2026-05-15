import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Hooks/useRedux";
import { getApiDanhMucKhoaHocThunk } from "../redux/reducer/DanhMucKhoaHocReducer";
import { logout } from "../redux/reducer/LoginReducer";
import type { RootState } from "../redux/store";

const HeaderHomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState<string>("");

  const { arrCategory } = useAppSelector(
    (state: RootState) => state.DanhMucKhoaHocReducer
  );

  const { userLogin } = useAppSelector(
    (state: RootState) => state.LoginReducer
  );

  useEffect(() => {
    dispatch(getApiDanhMucKhoaHocThunk());
  }, [dispatch]);

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/timkiemkhoahoc/${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLogin");

    dispatch(logout());
    navigate("/login");
  };

  const renderLogin = () => {
    if (userLogin) {
      return (
        <div className="d-flex align-items-center gap-3">
        
          
          {userLogin.maLoaiNguoiDung === "GV" && (
            <NavLink 
              to="/admin" 
              className="btn btn-warning d-flex align-items-center shadow-sm px-3"
              style={{ borderRadius: "20px", fontWeight: "600" }}
              title="Vào trang quản trị"
            >
              <i className="fa fa-user-shield me-2 fs-5"></i>
              Quản trị
            </NavLink>
          )}

     
          <NavLink 
            to="/profile" 
            className="text-dark fw-semibold text-decoration-none d-flex align-items-center hover-primary"
          >
            <i className="fa fa-user-circle fs-4 me-2 text-primary"></i>
            {userLogin.taiKhoan}
          </NavLink>

         
          <button
            className="btn btn-outline-danger px-3 rounded-pill d-flex align-items-center"
            onClick={handleLogout}
            title="Đăng xuất"
          >
            <i className="fa fa-sign-out-alt me-1"></i>
            <span className="d-none d-sm-inline ms-1">Đăng xuất</span>
          </button>
        </div>
      );
    }

    return (
      <div className="d-flex gap-2">
        <NavLink to="/register" className="btn btn-outline-dark px-4 rounded-pill fw-semibold">
          Đăng ký
        </NavLink>

        <NavLink to="/login" className="btn btn-dark px-4 rounded-pill fw-semibold shadow-sm">
          Đăng nhập
        </NavLink>
      </div>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
      <div className="container">
        <NavLink
          className="navbar-brand d-flex align-items-center transition-all hover-scale"
          to="/"
        >
          <img
            src="/lC22izJ.png"
            alt="Logo"
            width={70}
            height={50}
            className="me-2"
          />
          <span className="fw-bold text-uppercase fs-4 text-primary" style={{ letterSpacing: "1px" }}>Cybersoft</span>
        </NavLink>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex flex-grow-1 align-items-center ms-lg-4 gap-3 mt-3 mt-lg-0">
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle border shadow-sm fw-semibold"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-th-large me-2 text-primary"></i>
                Danh mục
              </button>

              <ul className="dropdown-menu shadow border-0 mt-2" style={{ borderRadius: "10px" }}>
                {arrCategory?.map((item) => (
                  <li key={item.maDanhMuc}>
                    <NavLink
                      className="dropdown-item py-2 fw-medium hover-bg-light"
                      to={`/danhmuckhoahoc/${item.maDanhMuc}`}
                    >
                      {item.tenDanhMuc}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="input-group flex-grow-1 shadow-sm rounded-pill overflow-hidden border">
              <input
                type="text"
                className="form-control border-0 px-4 bg-light"
                placeholder="Tìm kiếm khóa học..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />

              <button
                className="btn btn-primary px-4 border-0"
                type="button"
                onClick={handleSearch}
              >
                <i className="fa fa-search"></i>
                Search
              </button>
            </div>
          </div>

          <div className="ms-lg-4 mt-3 mt-lg-0 border-start ps-lg-4">{renderLogin()}</div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderHomePage;