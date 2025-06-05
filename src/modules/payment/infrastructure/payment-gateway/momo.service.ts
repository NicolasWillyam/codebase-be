import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class MomoService {
  private readonly logger = new Logger(MomoService.name);

  private readonly partnerCode = process.env.MOMO_PARTNER_CODE!;
  private readonly accessKey = process.env.MOMO_ACCESS_KEY!;
  private readonly secretKey = process.env.MOMO_SECRET_KEY!;
  private readonly endpoint = process.env.MOMO_ENDPOINT || 'https://test-payment.momo.vn/v2/gateway/api/create';

  async createPayment(orderId: string, amount: number, returnUrl: string, notifyUrl: string): Promise<any> {
    const requestId = `${orderId}-${Date.now()}`;
    const orderInfo = 'Thanh toán đơn hàng qua MoMo';
    const requestType = 'captureWallet';

    const rawSignature = `accessKey=${this.accessKey}&amount=${amount}&extraData=&ipnUrl=${notifyUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${returnUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto
      .createHmac('sha256', this.secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode: this.partnerCode,
      accessKey: this.accessKey,
      requestId,
      amount: amount.toString(),
      orderId,
      orderInfo,
      redirectUrl: returnUrl,
      ipnUrl: notifyUrl,
      requestType,
      extraData: '',
      signature,
      lang: 'vi',
    };

    try {
      const response = await axios.post(this.endpoint, requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });

      return response.data;
    } catch (error) {
      this.logger.error('MoMo payment error', error);
      throw new Error('Không thể tạo thanh toán với MoMo');
    }
  }
}
