import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center py-5">
      <h1 style={{ fontSize: "80px" }}>404</h1>
      <h3>Trang không tồn tại</h3>
      <p>URL bạn nhập không hợp lệ.</p>

      <NavLink to="/" className="btn btn-primary mt-3">
        Về trang chủ
      </NavLink>
    </div>
  );
};

export default NotFound;