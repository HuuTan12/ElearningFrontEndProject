// User Types
export interface User {
  taiKhoan: string;
  matKhau?: string;
  hoTen: string;
  email: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom?: string;
}
// Login Credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Register Credentials
export interface RegisterCredentials extends LoginCredentials {
  name: string;
  phone: string;
}

// Course Types
export type Course = {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;

  nguoiTao: {
    taiKhoan: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    tenLoaiNguoiDung: string;
  };

  danhMucKhoaHoc: {
    maDanhMucKhoahoc: string;
    tenDanhMucKhoaHoc: string;
  };
};

// Lesson Types
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Pagination Response
export interface PaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface Category {
  maDanhMuc: string;           
  tenDanhMuc: string;         
}




export interface ThemNguoiDung {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}

export interface CourseFormData {
  maKhoaHoc: string;      
  tenKhoaHoc: string;     
  danhMuc: string;         
  ngayTao: string;       
  luotXem: number;         
  danhGia: number;        
  hinhAnh: File | null;    
  nguoiTao: string;        
  moTa: string;            
}