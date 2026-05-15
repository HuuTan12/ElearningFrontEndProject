import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import '../assets/sass/Register.scss'

import type { RootState } from '../redux/store'
import { RegisterThunk } from '../redux/reducer/RegisterReducer'
import { useAppDispatch } from '../Hooks/useRedux'

interface RegisterFormValues {
  taiKhoan: string
  matKhau: string
  hoTen: string
  soDT: string
  email: string
  confirmPassword: string
  agreeToTerms: boolean
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { loading, error } = useSelector(
    (state: RootState) => state.RegisterReducer
  )

  const validationSchema = Yup.object({
    hoTen: Yup.string()
      .required('Vui lòng nhập họ tên'),

    taiKhoan: Yup.string()
      .required('Vui lòng nhập tài khoản'),

    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Vui lòng nhập email'),

    soDT: Yup.string()
      .required('Vui lòng nhập số điện thoại'),

    matKhau: Yup.string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Vui lòng nhập mật khẩu'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('matKhau')], 'Mật khẩu không khớp')
      .required('Vui lòng xác nhận mật khẩu'),

    agreeToTerms: Yup.boolean()
      .oneOf([true], 'Bạn phải đồng ý với điều khoản'),
  })

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      hoTen: '',
      soDT: '',
      email: '',
      confirmPassword: '',
      agreeToTerms: false,
    },

    validationSchema,

    onSubmit: (values) => {
      const dataSubmit = {
        taiKhoan: values.taiKhoan,
        matKhau: values.matKhau,
        hoTen: values.hoTen,
        soDT: values.soDT,
        maNhom: 'GP01',
        email: values.email,
      }

      dispatch(RegisterThunk(dataSubmit, navigate))
    },
  })

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="register-left">
          <div className="register-decoration">
            <h2>Tham Gia Với Chúng Tôi</h2>
            <p>Bắt đầu hành trình học tập của bạn ngay hôm nay</p>
            <div className="decoration-circles">
              <span className="circle circle-1"></span>
              <span className="circle circle-2"></span>
              <span className="circle circle-3"></span>
            </div>
          </div>
        </div>

        <div className="register-right">
          <div className="register-form-container">
            <div className="form-header">
              <h1>Đăng Ký</h1>
              <p>Tạo tài khoản để truy cập các khóa học</p>
            </div>

            {error && (
              <div className="alert alert-error">
                <span className="alert-icon">✕</span>
                {error}
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="register-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Họ và Tên *</label>
                  <input
                    name="hoTen"
                    type="text"
                    placeholder="Nhập họ và tên"
                    value={formik.values.hoTen}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-input"
                  />
                  {formik.touched.hoTen && formik.errors.hoTen && (
                    <span className="field-error">{formik.errors.hoTen}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Tài Khoản *</label>
                  <input
                    name="taiKhoan"
                    type="text"
                    placeholder="Nhập tài khoản"
                    value={formik.values.taiKhoan}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-input"
                  />
                  {formik.touched.taiKhoan && formik.errors.taiKhoan && (
                    <span className="field-error">{formik.errors.taiKhoan}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Nhập email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-input"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <span className="field-error">{formik.errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Số Điện Thoại *</label>
                  <input
                    name="soDT"
                    type="text"
                    placeholder="Nhập số điện thoại"
                    value={formik.values.soDT}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-input"
                  />
                  {formik.touched.soDT && formik.errors.soDT && (
                    <span className="field-error">{formik.errors.soDT}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Mật Khẩu *</label>
                  <input
                    name="matKhau"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={formik.values.matKhau}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-input"
                  />
                  {formik.touched.matKhau && formik.errors.matKhau && (
                    <span className="field-error">{formik.errors.matKhau}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Xác Nhận Mật Khẩu *</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-input"
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <span className="field-error">
                      {formik.errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formik.values.agreeToTerms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">
                    Tôi đồng ý với điều khoản và chính sách bảo mật *
                  </span>
                </label>

                {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
                  <span className="field-error">
                    {formik.errors.agreeToTerms}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`submit-button ${loading ? 'loading' : ''}`}
              >
                {loading ? 'Đang xử lý...' : 'Đăng Ký'}
              </button>

              <div className="form-footer">
                <p>
                  Đã có tài khoản?{' '}
                  <a onClick={() => navigate('/login')} className="login-link">
                    Đăng nhập ngay
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register