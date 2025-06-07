import { Injectable } from '@nestjs/common';
import { MomoService } from '../../infrastructure/payment-gateway/momo.service';
import { VnpayService } from '../../infrastructure/payment-gateway/vnpay.service';

/**
 * Interface mô tả dữ liệu đầu vào cho use case khởi tạo thanh toán.
 */
interface InitiatePaymentInput {
  orderId: string;            // Mã đơn hàng duy nhất cho giao dịch
  amount: number;             // Số tiền thanh toán (VND)
  provider: 'momo' | 'vnpay'; // Nhà cung cấp dịch vụ thanh toán
  clientIp?: string;          // Địa chỉ IP của client (chỉ áp dụng với VNPAY)
}

/**
 * Use case chịu trách nhiệm khởi tạo quá trình thanh toán,
 * gọi đến cổng thanh toán phù hợp (MoMo hoặc VNPAY) để sinh URL thanh toán.
 */
@Injectable()
export class InitiatePaymentUseCase {
  /**
   * Constructor inject các dịch vụ tương ứng với từng cổng thanh toán.
   * @param momoService Dịch vụ xử lý thanh toán với MoMo
   * @param vnpayService Dịch vụ xử lý thanh toán với VNPAY
   */
  constructor(
    private readonly momoService: MomoService,
    private readonly vnpayService: VnpayService,
  ) {}

  /**
   * Khởi tạo quá trình thanh toán.
   * Gửi thông tin đơn hàng đến cổng thanh toán tương ứng và trả về URL để người dùng redirect.
   * 
   * @param input Thông tin về đơn hàng và cổng thanh toán cần sử dụng
   * @returns Đối tượng chứa URL thanh toán
   * @throws Error nếu provider không được hỗ trợ
   */
  async execute(input: InitiatePaymentInput): Promise<{ url: string }> {
    const { orderId, amount, provider, clientIp } = input;

    // --- Thanh toán qua MoMo ---
    if (provider === 'momo') {
      const result = await this.momoService.createPayment(
        orderId,                    // Mã đơn hàng
        amount,                     // Số tiền
        process.env.MOMO_RETURN_URL!, // URL người dùng sẽ được chuyển về sau khi thanh toán
        process.env.MOMO_NOTIFY_URL!, // URL MoMo sẽ gửi thông báo trạng thái thanh toán
      );

      // Trả về đường dẫn để redirect người dùng đến giao diện thanh toán MoMo
      return { url: result.payUrl };
    }

    // --- Thanh toán qua VNPAY ---
    if (provider === 'vnpay') {
      const url = this.vnpayService.createPaymentUrl(
        orderId,            // Mã đơn hàng
        amount,             // Số tiền
        clientIp || '127.0.0.1' // Địa chỉ IP của client, mặc định là localhost nếu không có
      );

      // Trả về URL thanh toán VNPAY
      return { url };
    }

    // --- Trường hợp không hỗ trợ nhà cung cấp được yêu cầu ---
    throw new Error(`Unsupported provider: ${provider}`);
  }
}
