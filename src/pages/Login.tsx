import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../assets/sass/Login.scss";
import { LoginThunk } from "../redux/reducer/LoginReducer";
import { useAppDispatch } from "../Hooks/useRedux";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginFormik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },

    validationSchema: Yup.object({
      taiKhoan: Yup.string().required(
        "Tài khoản không được bỏ trống"
      ),

      matKhau: Yup.string()
        .min(6, "Mật khẩu ít nhất 6 ký tự")
        .required("Mật khẩu không được bỏ trống"),
    }),

    onSubmit: async (values) => {
      try {
        await dispatch(LoginThunk(values, navigate));
      } catch (error) {
        console.log("Lỗi đăng nhập:", error);
      }
    },
  });

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* LEFT */}
        <div className="login-left">
          <h2>Welcome Back!</h2>

          <p>
            Đăng nhập để tiếp tục trải nghiệm khóa học của bạn.
          </p>
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <h1>Đăng nhập</h1>

          <p className="subtitle">
            Vui lòng nhập thông tin tài khoản
          </p>

          <form
            className="login-form"
            onSubmit={loginFormik.handleSubmit}
          >
            {/* TÀI KHOẢN */}
            <div className="form-group">
              <label htmlFor="taiKhoan">Tài khoản</label>

              <input
                id="taiKhoan"
                name="taiKhoan"
                type="text"
                placeholder="Nhập tài khoản"
                value={loginFormik.values.taiKhoan}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
              />

              {loginFormik.touched.taiKhoan &&
                loginFormik.errors.taiKhoan && (
                  <p className="text text-danger">
                    {loginFormik.errors.taiKhoan}
                  </p>
                )}
            </div>

            {/* MẬT KHẨU */}
            <div className="form-group">
              <label htmlFor="matKhau">Mật khẩu</label>

              <input
                id="matKhau"
                name="matKhau"
                type="password"
                placeholder="Nhập mật khẩu"
                value={loginFormik.values.matKhau}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
              />

              {loginFormik.touched.matKhau &&
                loginFormik.errors.matKhau && (
                  <p className="text text-danger">
                    {loginFormik.errors.matKhau}
                  </p>
                )}
            </div>

            {/* BUTTON */}
            <button type="submit">
              Đăng nhập
            </button>
          </form>

          <p className="register-text">
            Chưa có tài khoản?{" "}
            <NavLink to="/register">
              Đăng ký
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;