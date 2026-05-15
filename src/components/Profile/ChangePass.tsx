type Props = {
  passwordData: any;

  handlePasswordInput: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  handleChangePassword: () => void;
};

const ChangePassword = ({
  passwordData,
  handlePasswordInput,
  handleChangePassword,
}: Props) => {
  return (
    <div className="mt-5">
      <h3 className="fw-bold mb-4">
        Đổi mật khẩu
      </h3>

      <div className="row g-4">
        {/* OLD PASSWORD */}
        <div className="col-12">
          <label className="form-label fw-semibold">
            Mật khẩu cũ
          </label>

          <input
            type="password"
            className="form-control form-control-lg"
            name="matKhauCu"
            value={passwordData.matKhauCu}
            onChange={handlePasswordInput}
          />
        </div>

        {/* NEW PASSWORD */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Mật khẩu mới
          </label>

          <input
            type="password"
            className="form-control form-control-lg"
            name="matKhauMoi"
            value={passwordData.matKhauMoi}
            onChange={handlePasswordInput}
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Nhập lại mật khẩu
          </label>

          <input
            type="password"
            className="form-control form-control-lg"
            name="nhapLaiMatKhau"
            value={passwordData.nhapLaiMatKhau}
            onChange={handlePasswordInput}
          />
        </div>

        {/* BUTTON */}
        <div className="col-12">
          <button
            className="btn btn-danger px-4 py-2"
            onClick={handleChangePassword}
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;