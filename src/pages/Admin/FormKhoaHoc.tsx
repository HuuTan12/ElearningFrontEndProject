import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import type { CourseFormData } from "../../Types";
import { useAppDispatch, useAppSelector } from "../../Hooks/useRedux";
import { getApiDanhMucKhoaHocThunk } from "../../redux/reducer/DanhMucKhoaHocReducer";
import type { Course } from "../../redux/reducer/QuanLyKhoaHocReducer";

interface Props {
  onClose: () => void;
  onSubmitCourse: (data: CourseFormData) => void;
  editingCourse: Course | null;
}




const FormKhoaHoc: React.FC<Props> = ({
  onClose,
  onSubmitCourse,
  editingCourse,
}) => {
  const { register, handleSubmit, control, reset, setValue } =
    useForm<CourseFormData>({
      defaultValues: {
        maKhoaHoc: "",
        tenKhoaHoc: "",
        danhMuc: "",
        ngayTao: new Date().toISOString().split("T")[0],
        luotXem: 0,
        danhGia: 0,
        hinhAnh: null,
        nguoiTao: "",
        moTa: "<p>Nhập mô tả khóa học...</p>",
      },
    });

  const dispatch = useAppDispatch();

  const { arrCategory } = useAppSelector(
    (state) => state.DanhMucKhoaHocReducer
  );

  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    dispatch(getApiDanhMucKhoaHocThunk());
  }, [dispatch]);

  useEffect(() => {
    if (editingCourse) {
      reset({
        maKhoaHoc: editingCourse.maKhoaHoc,
        tenKhoaHoc: editingCourse.tenKhoaHoc,
        danhMuc:
          editingCourse.danhMucKhoaHoc?.maDanhMucKhoaHoc || "",
        ngayTao: editingCourse.ngayTao,
        luotXem: editingCourse.luotXem,
        danhGia: editingCourse.danhGia,
        hinhAnh: null,
        nguoiTao: editingCourse.nguoiTao?.hoTen || "",
        moTa: editingCourse.moTa,
      });

      if (editingCourse.hinhAnh) {
        setImagePreview(editingCourse.hinhAnh);
      }
    }
  }, [editingCourse, reset]);

  const onSubmit = (data: CourseFormData) => {
    onSubmitCourse(data);

    reset();

    setImagePreview("");
  };

  return (
    <div
      className="modal d-block"
      style={{ background: "rgba(0,0,0,0.25)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <form
          className="modal-content p-4 rounded-4 shadow-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
      
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">
              {editingCourse
                ? "Cập nhật khóa học"
                : "Thêm khóa học"}
            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            />
          </div>

          <div className="row g-4">
        
            <div className="col-md-6">
              <label className="form-label">
                Mã khóa học
              </label>

              <input
                className="form-control"
                disabled={!!editingCourse}
                {...register("maKhoaHoc")}
              />

              <label className="form-label mt-3">
                Tên khóa học
              </label>

              <input
                className="form-control"
                {...register("tenKhoaHoc")}
              />

              <label className="form-label mt-3">
                Danh mục
              </label>

              <select
                className="form-select"
                {...register("danhMuc")}
              >
                {arrCategory.map((item) => (
                  <option
                    key={item.maDanhMuc}
                    value={item.maDanhMuc}
                  >
                    {item.tenDanhMuc}
                  </option>
                ))}
              </select>

              <label className="form-label mt-3">
                Ngày tạo
              </label>

              <input
                type="date"
                className="form-control"
                {...register("ngayTao")}
              />
            </div>

       
            <div className="col-md-6">
              <label className="form-label">
                Người tạo
              </label>

              <input
                className="form-control"
                value={
                  editingCourse
                    ? editingCourse.nguoiTao?.hoTen
                    : "Gia Bảo"
                }
                readOnly
              />

              <label className="form-label mt-3">
                Lượt xem
              </label>

              <input
                type="number"
                className="form-control"
                {...register("luotXem")}
              />

              <label className="form-label mt-3">
                Đánh giá
              </label>

              <input
                type="number"
                className="form-control"
                {...register("danhGia")}
              />

              <label className="form-label mt-3">
                Hình ảnh
              </label>

              <div className="d-flex gap-2 align-items-center">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    if (
                      e.target.files &&
                      e.target.files[0]
                    ) {
                      const file = e.target.files[0];

                      setImagePreview(
                        URL.createObjectURL(file)
                      );

                      setValue("hinhAnh", file);
                    }
                  }}
                />

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="preview"
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          
          <div className="mt-4">
            <label className="form-label">Mô tả</label>

            <Controller
              control={control}
              name="moTa"
              render={({ field }) => (
                <CKEditor
                  editor={ClassicEditor as any}
                  data={field.value}
                  onChange={(_, editor) =>
                    field.onChange(editor.getData())
                  }
                />
              )}
            />
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Hủy
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              {editingCourse
                ? "Cập nhật"
                : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default FormKhoaHoc;