import { Injectable } from '@nestjs/common';
import { VnpayService } from '../../infrastructure/payment-gateway/vnpay.service';
import { PaymentStatus } from '../domain/payment-status.enum';

interface VerifyPaymentInput {
  provider: 'vnpay' | 'momo';
  data: any;
}

interface VerifyPaymentResult {
  status: PaymentStatus;
  orderId: string;
  message?: string;
}

@Injectable()
export class VerifyPaymentUseCase {
  constructor(private readonly vnpayService: VnpayService) {}

  execute(input: VerifyPaymentInput): VerifyPaymentResult {
    const { provider, data } = input;

    if (provider === 'vnpay') {
      const isValid = this.vnpayService.verifyVnpayCallback(data);
      const orderId = data.vnp_TxnRef;

      if (!isValid) {
        return {
          status: PaymentStatus.FAILED,
          orderId,
          message: 'Invalid signature',
        };
      }

      const responseCode = data.vnp_ResponseCode;
      const status =
        responseCode === '00' ? PaymentStatus.SUCCESS : PaymentStatus.FAILED;

      return {
        status,
        orderId,
        message: `VNPAY Response Code: ${responseCode}`,
      };
    }

    if (provider === 'momo') {
      const orderId = data.orderId || data.order_id;

      const resultCode = data.resultCode ?? data.result_code;

      const status =
        String(resultCode) === '0'
          ? PaymentStatus.SUCCESS
          : PaymentStatus.FAILED;

      return {
        status,
        orderId,
        message: `MoMo Result Code: ${resultCode}`,
      };
    }

    throw new Error(`Unsupported provider: ${provider}`);
  }
}
