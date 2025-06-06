import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ForgotPasswordUseCase {
  private readonly logger = new Logger(ForgotPasswordUseCase.name);

  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *  //gửi token đặt lại mật khẩu qua email
      @param email 
      @returns 
   */
  async execute(email: string): Promise<{ message: string }> {
    // Tìm người dùng theo email
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      this.logger.warn(`Yêu cầu quên mật khẩu với email không tồn tại: ${email}`);
      throw new NotFoundException('Email không tồn tại');
    }

    // Tạo token reset có thời hạn ngắn 
    const resetToken = this.jwtService.sign(
      { sub: user.id },
      {
        secret: process.env.JWT_SECRET_RESET || 'reset123',
        expiresIn: '15m',
      },
    );

    // 3. (Tạm thời) Log token ra console thay vì gửi email
    this.logger.log(`Đã tạo token reset cho ${email}: ${resetToken}`);
    console.log(`Reset password token for ${email}: ${resetToken}`);

    // Trong tương lai có thể gọi EmailService.sendResetPasswordMail(email, resetToken)

    return { message: 'Đã gửi mã xác nhận qua email (tạm in log)' };
  }
}
