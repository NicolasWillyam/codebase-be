import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Res,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { MomoService } from '../payment-gateway/momo.service';
import { VnpayService } from '../payment-gateway/vnpay.service';
import { Response, Request } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly momoService: MomoService,
    private readonly vnpayService: VnpayService,
  ) {}

  /**
   * Tạo thanh toán với MoMo
   */
  @Post('momo/create')
  async createMomoPayment(
    @Body() body: { orderId: string; amount: number },
    @Res() res: Response,
  ) {
    const result = await this.momoService.createPayment(
      body.orderId,
      body.amount,
      process.env.MOMO_RETURN_URL!,
      process.env.MOMO_NOTIFY_URL!,
    );
    return res.status(HttpStatus.OK).json(result);
  }

  /**
   * Tạo thanh toán với VNPAY
   */
  @Post('vnpay/create')
  async createVnpayPayment(
    @Body() body: { orderId: string; amount: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const clientIp =
      req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress || '127.0.0.1';

    const paymentUrl = this.vnpayService.createPaymentUrl(
      body.orderId,
      body.amount,
      clientIp,
    );

    return res.status(HttpStatus.OK).json({ paymentUrl });
  }

  /**
   * Xử lý callback từ VNPAY (redirect)
   */
  @Get('vnpay-return')
  handleVnpayReturn(@Query() query: any, @Res() res: Response) {
    const isValid = this.vnpayService.verifyVnpayCallback(query);

    if (!isValid) {
      return res.status(HttpStatus.BAD_REQUEST).send('Sai chữ ký');
    }

    // Tại đây bạn có thể update đơn hàng tương ứng
    return res.status(HttpStatus.OK).send('Thanh toán thành công');
  }

  /**
   * Callback từ MoMo (IPN)
   */
  @Post('momo/notify')
  handleMomoNotify(@Body() body: any, @Res() res: Response) {
    // TODO: Xác minh chữ ký nếu cần
    // Update trạng thái thanh toán tại đây

    return res.status(HttpStatus.OK).json({ message: 'IPN received' });
  }
}
