import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/useRedux";
import {
  loadUsersToEnrollThunk,
  loadUsersPendingThunk,
  loadUsersEnrolledThunk,
  confirmEnrollThunk,
  cancelEnrollThunk,
  
} from "../../redux/reducer/GhiDanhKhoaHocReducer";


interface Props {
  onClose: () => void;
  maKhoaHoc: string;
}

const PopupGhiDanhKhoaHoc: React.FC<Props> = ({ onClose, maKhoaHoc }) => {
  const dispatch = useAppDispatch();
  const { usersToEnroll, usersPending, usersEnrolled, loading } = useAppSelector(
    (state) => state.GhiDanhKhoaHocReducer
  );

  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    dispatch(loadUsersToEnrollThunk(maKhoaHoc));
    dispatch(loadUsersPendingThunk(maKhoaHoc));
    dispatch(loadUsersEnrolledThunk(maKhoaHoc));
  }, [dispatch, maKhoaHoc]);

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.25)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content p-4 rounded-4 shadow-lg">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Ghi danh học viên</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          
          <div className="mb-3 d-flex gap-2 align-items-center">
            <select
              className="form-select w-50"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              disabled={loading || usersToEnroll.length === 0}
            >
              <option value="">-- Chọn học viên --</option>
              {usersToEnroll.map((u) => (
                <option key={u.taiKhoan} value={u.taiKhoan}>
                  {u.taiKhoan} {u.hoTen ? `(${u.hoTen})` : ""}
                </option>
              ))}
            </select>
            <button
              className="btn btn-success"
              disabled={!selectedUser}
              onClick={() => {
                dispatch(confirmEnrollThunk(maKhoaHoc, selectedUser));
                setSelectedUser("");
              }}
            >
              Ghi danh
            </button>
          </div>

          
          <h6>Học viên chờ xác thực</h6>
          <div className="table-responsive mb-3" style={{ maxHeight: 250, overflowY: "auto" }}>
            <table className="table table-bordered table-sm mb-0">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tài khoản</th>
                  <th>Họ tên</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {usersPending.map((u, idx) => (
                  <tr key={u.taiKhoan}>
                    <td>{idx + 1}</td>
                    <td>{u.taiKhoan}</td>
                    <td>{u.hoTen || "--"}</td>
                    <td className="d-flex gap-1">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => dispatch(confirmEnrollThunk(maKhoaHoc, u.taiKhoan))}
                      >
                        Xác thực
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => dispatch(cancelEnrollThunk(maKhoaHoc, u.taiKhoan))}
                      >
                        Hủy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         
          <h6>Học viên đã ghi danh</h6>
          <div className="table-responsive" style={{ maxHeight: 250, overflowY: "auto" }}>
            <table className="table table-bordered table-sm mb-0">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tài khoản</th>
                  <th>Họ tên</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {usersEnrolled.map((u, idx) => (
                  <tr key={u.taiKhoan}>
                    <td>{idx + 1}</td>
                    <td>{u.taiKhoan}</td>
                    <td>{u.hoTen || "--"}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => dispatch(cancelEnrollThunk(maKhoaHoc, u.taiKhoan))}
                      >
                        Hủy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PopupGhiDanhKhoaHoc;