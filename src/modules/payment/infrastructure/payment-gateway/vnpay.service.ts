import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import * as qs from 'qs';

@Injectable()
export class VnpayService {
  private readonly logger = new Logger(VnpayService.name);

  private readonly vnp_TmnCode = process.env.VNPAY_TMN_CODE!;
  private readonly vnp_HashSecret = process.env.VNPAY_HASH_SECRET!;
  private readonly vnp_Url = process.env.VNPAY_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  private readonly vnp_ReturnUrl = process.env.VNPAY_RETURN_URL!;

  /**
   * Tạo URL thanh toán VNPAY và trả về để frontend redirect
   */
  createPaymentUrl(orderId: string, amount: number, clientIp: string): string {
    const createDate = this.getCurrentDate();
    const vnp_Amount = amount * 100; // VNPAY yêu cầu đơn vị là VND * 100
    const vnp_TxnRef = orderId;

    const params: Record<string, string> = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: this.vnp_TmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef,
      vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
      vnp_OrderType: 'other',
      vnp_Amount: vnp_Amount.toString(),
      vnp_ReturnUrl: this.vnp_ReturnUrl,
      vnp_IpAddr: clientIp,
      vnp_CreateDate: createDate,
    };

    // Sắp xếp keys theo thứ tự alphabet
    const sortedParams = Object.fromEntries(
      Object.entries(params).sort(([a], [b]) => a.localeCompare(b))
    );

    const signData = qs.stringify(sortedParams, { encode: false });
    const secureHash = crypto
      .createHmac('sha512', this.vnp_HashSecret)
      .update(signData)
      .digest('hex');

    const paymentUrl = `${this.vnp_Url}?${signData}&vnp_SecureHash=${secureHash}`;
    return paymentUrl;
  }

  /**
   * Xác minh chữ ký khi VNPAY callback về server (IPN hoặc redirect)
   */
  verifyVnpayCallback(query: Record<string, string>): boolean {
    const { vnp_SecureHash, vnp_SecureHashType, ...rest } = query;

    const sortedParams = Object.fromEntries(
      Object.entries(rest).sort(([a], [b]) => a.localeCompare(b))
    );

    const signData = qs.stringify(sortedParams, { encode: false });
    const expectedHash = crypto
      .createHmac('sha512', this.vnp_HashSecret)
      .update(signData)
      .digest('hex');

    return expectedHash === vnp_SecureHash;
  }

  private getCurrentDate(): string {
    const date = new Date();
    return date.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
  }
}
Footer
© 2025 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Stat