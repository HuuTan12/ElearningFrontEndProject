import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { ThemNguoiDung } from "../../Types";

interface Props {
  show: boolean;
  onClose: () => void;
  type: "THEM" | "SUA";
  initialData?: ThemNguoiDung | null;
  onSubmit: (data: ThemNguoiDung) => void;
}

const PopupNguoiDung: React.FC<Props> = ({
  show,
  onClose,
  type,
  initialData,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ThemNguoiDung>({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (show) {
      reset({
        taiKhoan: initialData?.taiKhoan || "",
        matKhau: initialData?.matKhau || "",
        hoTen: initialData?.hoTen || "",
        email: initialData?.email || "",
        soDT: initialData?.soDT || "",
        maLoaiNguoiDung: initialData?.maLoaiNguoiDung || "HV",
        maNhom: "GP01",
      });
    }
  }, [show, initialData, reset]);

  if (!show) return null;

  const handleSubmitForm = (data: ThemNguoiDung) => {
    onSubmit({
      ...data,
      maNhom: "GP01",
    });

    reset({
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "HV",
      maNhom: "GP01",
    });
  };

  return (
    <div
      className="modal d-block animate__animated animate__fadeIn"
      style={{
        background: "rgba(0,0,0,0.15)",
        backdropFilter: "blur(1px)",
      }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="modal-content border-0 shadow-lg rounded-4"
          style={{
            minHeight: "600px",
            background: "#fff",
          }}
        >
          <div className="px-4 pt-4 d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">
              {type === "THEM" ? "Thêm người dùng" : "Cập nhật người dùng"}
            </h5>

            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <hr className="mx-4" />

          <div className="modal-body px-5 py-3">
            <div className="row g-4">
              <div className="col-md-6">
                <label className="fw-semibold">Tài khoản</label>

                <input
                  className="form-control form-control-lg shadow-sm"
                  placeholder="Nhập tài khoản..."
                  {...register("taiKhoan", {
                    required: "Bắt buộc",
                  })}
                />

                <small className="text-danger">
                  {errors.taiKhoan?.message}
                </small>
              </div>

              <div className="col-md-6">
                <label className="fw-semibold">Mật khẩu</label>

                <input
                  type="password"
                  className="form-control form-control-lg shadow-sm"
                  placeholder="••••••••"
                  {...register("matKhau", {
                    required: "Bắt buộc",
                  })}
                />

                <small className="text-danger">{errors.matKhau?.message}</small>
              </div>

              <div className="col-md-6">
                <label className="fw-semibold">Họ tên</label>

                <input
                  className="form-control form-control-lg shadow-sm"
                  placeholder="Nguyễn Văn A"
                  {...register("hoTen", {
                    required: "Bắt buộc",
                  })}
                />

                <small className="text-danger">{errors.hoTen?.message}</small>
              </div>

              <div className="col-md-6">
                <label className="fw-semibold">Email</label>

                <input
                  className="form-control form-control-lg shadow-sm"
                  placeholder="email@gmail.com"
                  {...register("email", {
                    required: "Bắt buộc",
                  })}
                />

                <small className="text-danger">{errors.email?.message}</small>
              </div>

              <div className="col-md-6">
                <label className="fw-semibold">Số điện thoại</label>

                <input
                  className="form-control form-control-lg shadow-sm"
                  placeholder="09xxxxxxxx"
                  {...register("soDT", {
                    required: "Bắt buộc",
                  })}
                />

                <small className="text-danger">{errors.soDT?.message}</small>
              </div>

              <div className="col-md-6">
                <label className="fw-semibold">Loại người dùng</label>

                <select
                  className="form-select form-select-lg shadow-sm"
                  {...register("maLoaiNguoiDung", {
                    required: "Bắt buộc",
                  })}
                >
                  <option value="HV">Học viên</option>

                  <option value="GV">Giáo vụ</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer border-0 px-5 pb-4 d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-light px-4"
              onClick={onClose}
            >
              Huỷ
            </button>

            <button type="submit" className="btn btn-dark px-5">
              {type === "THEM" ? "Thêm" : "Lưu"}
            </button>
          </div>
        </form>
      </div>
      z
    </div>
  );
};

export default PopupNguoiDung;
