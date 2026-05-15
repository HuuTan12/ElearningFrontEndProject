import  { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const AdminTemplates = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const userLogin = JSON.parse(localStorage.getItem('userLogin') || '{}');

  return (
    <>
      {/* CSS nội bộ để xử lý hiệu ứng hover mà không cần file SCSS */}
      <style>{`
        .hover-bg-secondary { transition: 0.3s; }
        .hover-bg-secondary:hover { background-color: rgba(255,255,255,0.1); transform: translateX(5px); }
        .sidebar-transition { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
      `}</style>

      <div className="d-flex bg-light" style={{ minHeight: '100vh', overflow: 'hidden' }}>
        
        {/* SIDEBAR */}
        <div 
          className="bg-dark text-white shadow-lg sidebar-transition d-flex flex-column" 
          style={{ 
            width: isSidebarOpen ? '260px' : '0px', 
            opacity: isSidebarOpen ? 1 : 0,
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}
        >
          <div className="p-3">
            <div className="d-flex align-items-center mb-4 mt-2 justify-content-center">
              <img src="/lC22izJ.png" alt="Logo" width={50} height={40} className="me-2" />
              <span className="fw-bold text-uppercase fs-5 text-info" style={{ letterSpacing: "1px" }}>Cybersoft</span>
            </div>
            <hr className="bg-secondary opacity-50" />
            <ul className="nav flex-column gap-2 mt-3">
              <li className="nav-item">
                <NavLink 
                  to="/admin/quanlykhoahoc" 
                  className={({isActive}) => `nav-link text-white rounded p-3 fw-bold ${isActive ? 'bg-primary shadow-sm' : 'hover-bg-secondary'}`}
                >
                  <i className="fa fa-book me-3 w-20px text-center"></i> Quản lý khóa học
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/admin/quanlynguoidung" 
                  className={({isActive}) => `nav-link text-white rounded p-3 fw-bold ${isActive ? 'bg-primary shadow-sm' : 'hover-bg-secondary'}`}
                >
                  <i className="fa fa-users me-3 w-20px text-center"></i> Quản lý người dùng
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* NỘI DUNG CHÍNH (BÊN PHẢI) */}
        <div className="flex-grow-1 d-flex flex-column sidebar-transition" style={{ width: '100%' }}>
          
          {/* HEADER */}
          <header className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center z-index-1">
            <div className="d-flex align-items-center">
              <button className="btn btn-light border-0 shadow-none me-3" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <i className="fa fa-bars fs-4 text-secondary"></i>
              </button>
              <h5 className="mb-0 fw-bold text-secondary d-none d-md-block">Dashboard Quản Trị</h5>
            </div>

            <div className="dropdown">
              <button className="btn btn-light dropdown-toggle d-flex align-items-center border-0 shadow-none bg-transparent" type="button" data-bs-toggle="dropdown">
                <span className="me-3">Chào, <span className="text-primary fw-bold">{userLogin.hoTen || 'Admin'}</span></span>
                <img src={`https://ui-avatars.com/api/?name=${userLogin.hoTen || 'A'}&background=0D8ABC&color=fff&rounded=true`} alt="avatar" width="38" className="shadow-sm" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2" style={{ borderRadius: '10px' }}>
                <li><button className="dropdown-item py-2"><i className="fa fa-id-card me-2 text-secondary"></i> Hồ sơ cá nhân</button></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger py-2 fw-bold" onClick={() => {
                    if(window.confirm("Bạn muốn đăng xuất khỏi hệ thống?")) {
                      localStorage.clear();
                      navigate('/');
                    }
                  }}>
                    <i className="fa fa-sign-out-alt me-2"></i> Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          </header>

          {/* RENDER COMPONENT CON VÀO ĐÂY */}
          <main className="p-4 flex-grow-1 overflow-auto bg-light">
            <Outlet />
          </main>
          
        </div>
      </div>
    </>
  );
};

export default AdminTemplates;