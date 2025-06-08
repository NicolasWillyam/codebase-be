

/**
 * Enum đại diện cho các trạng thái thanh toán trong hệ thống.
 */
export enum PaymentStatus {
  PENDING = 'PENDING',           // Đang chờ xử lý
  COMPLETED = 'COMPLETED',       // Đã thanh toán thành công
  FAILED = 'FAILED',             // Thanh toán thất bại
  CANCELLED = 'CANCELLED',       // Người dùng hoặc hệ thống đã huỷ thanh toán
  REFUNDED = 'REFUNDED'          // Đã hoàn tiền
}
