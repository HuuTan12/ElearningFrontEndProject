import { useEffect, useState } from "react";
import { getProfileThunk } from "../redux/reducer/LoginReducer";
import type { RootState } from "../redux/store";
import { httpClient } from "../util/Config";
import { useAppDispatch, useAppSelector } from "./useRedux";

const useProfile = () => {
  const dispatch = useAppDispatch();

  const { userLogin, loading, userProfile } = useAppSelector(
    (state: RootState) => state.LoginReducer
  );

  const [isEdit, setIsEdit] = useState(false);

  const [formValue, setFormValue] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    maLoaiNguoiDung: "",
    maNhom: "GP01",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    matKhauCu: "",
    matKhauMoi: "",
    nhapLaiMatKhau: "",
  });

  // GET PROFILE
  useEffect(() => {
    dispatch(getProfileThunk());
  }, [dispatch]);

  // SET PROFILE DATA
  useEffect(() => {
    if (userLogin) {
      setFormValue({
        taiKhoan: userLogin.taiKhoan || "",
        matKhau: userLogin.matKhau || "",
        hoTen: userLogin.hoTen || "",
        soDT: userLogin.soDT || "",
        maLoaiNguoiDung:
          userLogin.maLoaiNguoiDung || "HV",
        maNhom: userLogin.maNhom || "GP01",
        email: userLogin.email || "",
      });
    }
  }, [userLogin]);

  // HANDLE PROFILE INPUT
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  // HANDLE PASSWORD INPUT
  const handlePasswordInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  // UPDATE PROFILE
  const handleUpdate = async () => {
    try {
      await httpClient.put(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        formValue
      );

      alert("Cập nhật thành công");

      dispatch(getProfileThunk());

      setIsEdit(false);
    } catch (error: any) {
      alert(
        error.response?.data?.content ||
          "Cập nhật thất bại"
      );
    }
  };

  // CHANGE PASSWORD
    // CHANGE PASSWORD
  const handleChangePassword = async () => {
    try {
      // CHECK CONFIRM PASSWORD
      if (
        passwordData.matKhauMoi !==
        passwordData.nhapLaiMatKhau
      ) {
        alert("Nhập lại mật khẩu không khớp");
        return;
      }

      const updateData = {
        ...formValue,
        matKhau: passwordData.matKhauMoi,
      };

      await httpClient.put(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        updateData
      );

      alert("Đổi mật khẩu thành công");

      // RESET
      setPasswordData({
        matKhauCu: "",
        matKhauMoi: "",
        nhapLaiMatKhau: "",
      });

      dispatch(getProfileThunk());
    } catch (error: any) {
      alert(
        error.response?.data?.content ||
          "Đổi mật khẩu thất bại"
      );
    }
  };

  return {
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
  };
};

export default useProfile;