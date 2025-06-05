import { Injectable } from '@nestjs/common';
import { MomoService } from '../../infrastructure/payment-gateway/momo.service';
import { VnpayService } from '../../infrastructure/payment-gateway/vnpay.service';

interface InitiatePaymentInput {
  orderId: string;
  amount: number;
  provider: 'momo' | 'vnpay';
  clientIp?: string; // bắt buộc với vnpay
}

@Injectable()
export class InitiatePaymentUseCase {
  constructor(
    private readonly momoService: MomoService,
    private readonly vnpayService: VnpayService,
  ) {}

  async execute(input: InitiatePaymentInput): Promise<{ url: string }> {
    const { orderId, amount, provider, clientIp } = input;

    if (provider === 'momo') {
      const result = await this.momoService.createPayment(
        orderId,
        amount,
        process.env.MOMO_RETURN_URL!,
        process.env.MOMO_NOTIFY_URL!,
      );
      return { url: result.payUrl };
    }

    if (provider === 'vnpay') {
      const url = this.vnpayService.createPaymentUrl(orderId, amount, clientIp || '127.0.0.1');
      return { url };
    }

    throw new Error(`Unsupported provider: ${provider}`);
  }
}
