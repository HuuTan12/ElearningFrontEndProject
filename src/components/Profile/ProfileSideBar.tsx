type Props = {
  userLogin: any;
  setActiveTab: (tab: 'info' | 'courses') => void;
  activeTab: string;
};

const ProfileSidebar = ({ userLogin, setActiveTab, activeTab }: Props) => {
  return (
    <div
      className="h-100 text-white d-flex flex-column align-items-center p-5"
      style={{ background: "linear-gradient(135deg,#111827,#374151)" }}
    >
      <img
        src="https://i.pravatar.cc/300"
        alt="avatar"
        className="rounded-circle shadow-lg mb-4 border border-4 border-secondary"
        width={140}
        height={140}
      />
      <h4 className="fw-bold text-center mb-1">{userLogin?.hoTen}</h4>
      <p className="text-light opacity-75 small mb-4">{userLogin?.email}</p>

      {/* Menu điều hướng nội bộ */}
      <div className="w-100 mt-3">
        <button 
          onClick={() => setActiveTab('info')}
          className={`btn w-100 text-start mb-2 py-3 px-4 rounded-3 transition-all ${activeTab === 'info' ? 'btn-primary shadow' : 'btn-outline-light border-0'}`}
        >
          <i className="fa fa-user me-3"></i> Thông tin cá nhân
        </button>
        <button 
          onClick={() => setActiveTab('courses')}
          className={`btn w-100 text-start py-3 px-4 rounded-3 transition-all ${activeTab === 'courses' ? 'btn-primary shadow' : 'btn-outline-light border-0'}`}
        >
          <i className="fa fa-book me-3"></i> Khóa học của tôi
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;