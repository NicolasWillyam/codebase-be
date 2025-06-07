// payment/domain/payment-status.enum.ts

export enum PaymentStatus {
  PENDING = 'PENDING',         // Chưa thanh toán
  SUCCESS = 'SUCCESS',         // Thanh toán thành công
  FAILED = 'FAILED',           // Thanh toán thất bại
  CANCELED = 'CANCELED',       // Bị hủy bởi người dùng
  EXPIRED = 'EXPIRED',         // Hết hạn thanh toán
  REFUNDED = 'REFUNDED',       // Đã hoàn tiền
}

