import { Injectable } from '@nestjs/common';
import { MomoService } from '../../infrastructure/payment-gateway/momo.service';
import { VnpayService } from '../../infrastructure/payment-gateway/vnpay.service';

/**
 * Đầu vào cho use case khởi tạo thanh toán
 */
interface InitiatePaymentInput {
  orderId: string;            // Mã đơn hàng
  amount: number;             // Số tiền thanh toán
  provider: 'momo' | 'vnpay'; // Nhà cung cấp thanh toán
  clientIp?: string;          // Địa chỉ IP của client (chỉ dùng cho VNPAY)
}

@Injectable()
export class InitiatePaymentUseCase {
  constructor(
    private readonly momoService: MomoService,
    private readonly vnpayService: VnpayService,
  ) {}

  /**
   * Thực hiện khởi tạo thanh toán với nhà cung cấp tương ứng.
   * @param input Thông tin khởi tạo thanh toán
   * @returns URL để người dùng chuyển hướng đến cổng thanh toán
   */
  async execute(input: InitiatePaymentInput): Promise<{ url: string }> {
    const { orderId, amount, provider, clientIp } = input;

    // Xử lý thanh toán qua MoMo
    if (provider === 'momo') {
      const result = await this.momoService.createPayment(
        orderId,
        amount,
        process.env.MOMO_RETURN_URL!, // URL người dùng được chuyển về sau khi thanh toán
        process.env.MOMO_NOTIFY_URL!, // URL MoMo gọi về để thông báo kết quả
      );
      return { url: result.payUrl };
    }

    // Xử lý thanh toán qua VNPAY
    if (provider === 'vnpay') {
      const url = this.vnpayService.createPaymentUrl(
        orderId,
        amount,
        clientIp || '127.0.0.1' // Nếu không có IP, mặc định localhost
      );
      return { url };
    }

    // Trường hợp nhà cung cấp không được hỗ trợ
    throw new Error(`Unsupported provider: ${provider}`);
  }
}

