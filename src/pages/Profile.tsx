import { useEffect, useState } from "react";
import ChangePassword from "../components/Profile/ChangePass";
import MyCourse from "../components/Profile/MyCourse";
import ProfileInfo from "../components/Profile/ProfileInfo";
import useProfile from "../Hooks/useProfile";
import ProfileSidebar from "../components/Profile/ProfileSideBar";
import { useSearchParams } from "react-router-dom";
import { getProfileThunk } from "../redux/reducer/LoginReducer";
import { useAppDispatch } from "../Hooks/useRedux"; // Nhớ import hook này

const Profile = () => {
  const dispatch = useAppDispatch(); // 1. Khai báo dispatch ở đây
  const [searchParam] = useSearchParams();
  const tab = searchParam.get("tab");

  const [activeTab, setActiveTab] = useState<'info' | 'courses'>(
    tab === 'courses' ? 'courses' : 'info'
  );

  // 2. Theo dõi thay đổi của URL để nhảy tab tự động
  useEffect(() => {
    if (tab === 'courses') {
      setActiveTab('courses');
    }
  }, [tab]);

  const {
    userLogin,
    userProfile,
    loading,
    formValue,
    passwordData,
    isEdit,
    setIsEdit,
    handleChange,
    handlePasswordInput,
    handleUpdate,
    handleChangePassword,
  } = useProfile();

  // 3. Gọi API 9 để lấy thông tin mới nhất (bao gồm ds khóa học)
  useEffect(() => {
    dispatch(getProfileThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark"></div>
      </div>
    );
  }

  return (
    <div
      className="py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f3f4f6, #e0e7ff)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div
              className="card border-0 shadow-lg overflow-hidden"
              style={{ borderRadius: "30px" }}
            >
              <div className="row g-0">
                <div className="col-lg-4">
                  <ProfileSidebar
                    userLogin={userLogin} 
                    setActiveTab={setActiveTab} 
                    activeTab={activeTab} 
                  />
                </div>

                <div className="col-lg-8 bg-white p-4 p-md-5">
                  {activeTab === 'info' ? (
                    <div className="animate__animated animate__fadeIn">
                      <ProfileInfo
                        formValue={formValue}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        handleChange={handleChange}
                        handleUpdate={handleUpdate}
                      />
                      <hr className="my-5" />
                      <ChangePassword
                        passwordData={passwordData}
                        handlePasswordInput={handlePasswordInput}
                        handleChangePassword={handleChangePassword}
                      />
                    </div>
                  ) : (
                    <div className="animate__animated animate__fadeIn">
                      {/* Truyền userLogin đã được cập nhật từ API 9 vào đây */}
                      <MyCourse userProfile={userProfile
                        
                      } />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;