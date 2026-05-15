import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Hooks/useRedux";
import {
  addUserApiThunk,
  deleteUserApiThunk,
  loadUsersApiThunk,
  updateUserApiThunk,
} from "../../redux/reducer/AdminReducer";
import type { ThemNguoiDung } from "../../Types";
import FormUser from "./FormUser";

import PopupGhiDanh from "./PopupGhiDanh";

const QuanLyNguoiDung: React.FC = () => {
  const dispatch = useAppDispatch();

  const arrUser = useSelector((state: any) => state.AdminReducer.arrUser);

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"THEM" | "SUA">("THEM");
  const [selectedUser, setSelectedUser] = useState<ThemNguoiDung | null>(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUserPopup, setSelectedUserPopup] = useState<ThemNguoiDung | null>(null);

  const handleOpenPopup = (user: ThemNguoiDung) => {
    setSelectedUserPopup(user);
    setIsPopupOpen(true);
  }

  useEffect(() => {
    dispatch(loadUsersApiThunk());
  }, [dispatch]);

  const handleAdd = () => {
    setMode("THEM");
    setSelectedUser(null);
    setIsOpen(true);
  };

  const handleEdit = async (data: ThemNguoiDung) => {
  setMode("SUA");
  setSelectedUser(data);
  setIsOpen(true);
};
  const handleSubmit = async (data: ThemNguoiDung) => {
  if (mode === "THEM") {
    await dispatch(addUserApiThunk(data));
  } else {
    await dispatch(updateUserApiThunk(data));
  }

  setIsOpen(false);
};

  const handleDelete = async (taiKhoan: string) => {
  const confirmDelete = window.confirm(
    "Bạn có chắc muốn xoá người dùng này?"
  );
  if (!confirmDelete) return;

  // trim tài khoản trước khi gửi
  const taiKhoanClean = taiKhoan.trim();

  await dispatch(deleteUserApiThunk(taiKhoanClean));
};

  return (
    <div
      className="container-fluid py-4 bg-white"
      style={{
        minHeight: "100vh",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <style>{`
        .wireframe-input {
          border: 2px solid #000 !important;
          border-radius: 4px;
          padding: 10px 15px;
        }

        .wireframe-input:focus {
          box-shadow: none;
          border-color: #0d6efd !important;
        }

        .wireframe-btn {
          border: 2px solid #000;
          background: #fff;
          font-weight: bold;
          box-shadow: 2px 2px 0px #000;
          transition: all 0.1s;
          border-radius: 4px;
          white-space: nowrap;
        }

        .wireframe-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 0px 0px 0px #000;
        }

        .table-box {
          width: 100%;
          max-height: 68vh;
          overflow: auto;
          border: 2px solid #000;
        }

        .table-wireframe {
          width: 100%;
          min-width: 900px;
          table-layout: fixed;
          margin-bottom: 0;
        }

        .table-wireframe th,
        .table-wireframe td {
          border: 1px solid #000;
          vertical-align: middle;
          word-break: break-word;
          white-space: normal;
          padding: 14px 10px;
        }

        .table-wireframe thead th {
          background-color: #e9ecef;
          position: sticky;
          top: 0;
          z-index: 2;
        }

        .col-stt {
          width: 60px;
        }

        .col-account {
          width: 170px;
        }

        .col-name {
          width: 220px;
        }

        .col-email {
          width: 280px;
        }

        .col-phone {
          width: 150px;
        }

        .col-type {
          width: 100px;
        }

        .col-action {
          width: 240px;
        }
      `}</style>

      <button
        className="text-primary fw-bold mb-4"
        style={{
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={handleAdd}
      >
        ➕ Thêm người dùng
      </button>

      <div className="d-flex gap-3 mb-4">
        <input
          type="text"
          className="form-control wireframe-input"
          placeholder="Nhập tài khoản hoặc họ tên người dùng"
        />

        <button className="btn wireframe-btn px-4">
          Tìm
        </button>
      </div>

      <div className="table-box">
        <table className="table table-striped table-wireframe">
          <thead>
            <tr>
              <th className="text-center col-stt">
                STT
              </th>

              <th className="col-account">
                Tài khoản
              </th>

              <th className="col-name">
                Họ tên
              </th>

              <th className="col-email">
                Email
              </th>

              <th className="col-phone">
                Số điện thoại
              </th>

              <th className="text-center col-type">
                Loại
              </th>

              <th className="col-action">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {arrUser.map((item: ThemNguoiDung, index: number) => (
              <tr key={item.taiKhoan}>
                <td className="text-center fw-bold">
                  {index + 1}
                </td>

                <td className="fw-bold">
                  {item.taiKhoan}
                </td>

                <td>
                  {item.hoTen}
                </td>

                <td>
                  {item.email}
                </td>

                <td>
                  {item.soDT}
                </td>

                <td className="text-center">
                  <span
                    className={`badge ${
                      item.maLoaiNguoiDung === "GV"
                        ? "bg-danger"
                        : "bg-primary"
                    }`}
                  >
                    {item.maLoaiNguoiDung}
                  </span>
                </td>

                <td>
                  <div className="d-flex gap-2 flex-wrap">
                    <button
                      className="btn wireframe-btn px-3 py-1"
                      onClick={() => handleOpenPopup(item)}
                    >
                      Ghi danh
                    </button>

                    <button
                      className="btn wireframe-btn px-3 py-1"
                      onClick={() => handleEdit(item)}
                    >
                      Sửa
                    </button>

                    <button
                      className="btn wireframe-btn px-3 py-1 text-danger"
                      onClick={() => handleDelete(item.taiKhoan)}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {arrUser.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  Chưa có người dùng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <FormUser
        show={isOpen}
        onClose={() => setIsOpen(false)}
        type={mode}
        initialData={selectedUser}
        onSubmit={handleSubmit}
      />
      <PopupGhiDanh
  show={isPopupOpen}
  onClose={() => setIsPopupOpen(false)}
  user={selectedUserPopup}
/>
    </div>
  );
};

export default QuanLyNguoiDung;