/**
 * Data Transfer Object (DTO) dùng để tạo thanh toán mới.
 */
export interface CreatePaymentDto {
  amount: number;                 // Số tiền thanh toán (theo đơn vị tiền tệ đã chọn)
  currency: string;              // Đơn vị tiền tệ (ví dụ: 'VND', 'USD')
  description: string;           // Mô tả ngắn gọn về giao dịch (hiển thị cho người dùng)
  metadata?: Record<string, any>; // Dữ liệu phụ trợ tuỳ ý (ví dụ: orderId, userId, etc.)
}

/**
 * Cấu trúc phản hồi sau khi tạo/thao tác với giao dịch thanh toán.
 */
export interface PaymentResponse {
  id: string;                    // Mã giao dịch thanh toán (unique ID)
  amount: number;                // Số tiền thanh toán
  currency: string;              // Đơn vị tiền tệ
  status: 'pending' | 'completed' | 'failed'; // Trạng thái giao dịch
  createdAt: Date;               // Thời điểm tạo giao dịch
}

/**
 * Interface trừu tượng hóa dịch vụ thanh toán.
 * Có thể được implement bởi nhiều cổng thanh toán khác nhau (MoMo, VNPAY, PayPal,...)
 */
export interface PaymentService {
  /**
   * Tạo một giao dịch thanh toán mới.
   * @param dto Thông tin cần thiết để khởi tạo giao dịch
   * @returns Thông tin phản hồi từ hệ thống thanh toán
   */
  createPayment(dto: CreatePaymentDto): Promise<PaymentResponse>;

  /**
   * Xác minh trạng thái của một giao dịch thanh toán.
   * @param paymentId Mã giao dịch cần kiểm tra
   * @returns Trạng thái mới nhất của giao dịch
   */
  verifyPayment(paymentId: string): Promise<PaymentResponse>;

  /**
   * Hủy một giao dịch thanh toán (nếu được hỗ trợ bởi nhà cung cấp).
   * @param paymentId Mã giao dịch cần hủy
   */
  cancelPayment(paymentId: string): Promise<void>;
}
