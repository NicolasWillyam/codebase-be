// Định nghĩa các loại vai trò người dùng trong hệ thống
export enum UserRole {
  Admin = 'admin', // Toàn quyền quản lý
  Staff = 'staff', // Nhân viên xử lý booking
  Guide = 'guide', // Hướng dẫn viên
  Partner = 'partner', // Bên thứ ba đăng tour
  User = 'user', // Người dùng đăng ký bình thường
}
