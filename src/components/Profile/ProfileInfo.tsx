type Props = {
  formValue: any;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleUpdate: () => void;
};

const ProfileInfo = ({
  formValue,
  isEdit,
  setIsEdit,
  handleChange,
  handleUpdate,
}: Props) => {
  return (
    <>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-1">
            Thông tin cá nhân
          </h2>

          <p className="text-muted mb-0">
            Quản lý tài khoản của bạn
          </p>
        </div>

        {!isEdit ? (
          <button
            className="btn btn-dark px-4 py-2"
            onClick={() => setIsEdit(true)}
          >
            Chỉnh sửa
          </button>
        ) : (
          <button
            className="btn btn-success px-4 py-2"
            onClick={handleUpdate}
          >
            Lưu thay đổi
          </button>
        )}
      </div>

      {/* FORM */}
      <div className="row g-4">
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Họ tên
          </label>

          <input
            type="text"
            className="form-control form-control-lg"
            name="hoTen"
            value={formValue.hoTen}
            disabled={!isEdit}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Tài khoản
          </label>

          <input
            type="text"
            className="form-control form-control-lg"
            value={formValue.taiKhoan}
            disabled
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Email
          </label>

          <input
            type="email"
            className="form-control form-control-lg"
            name="email"
            value={formValue.email}
            disabled={!isEdit}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Số điện thoại
          </label>

          <input
            type="text"
            className="form-control form-control-lg"
            name="soDT"
            value={formValue.soDT}
            disabled={!isEdit}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;