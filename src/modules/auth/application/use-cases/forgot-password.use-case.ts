import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '@/shared/email/email.service'; 

@Injectable()
export class ForgotPasswordUseCase {
  private readonly logger = new Logger(ForgotPasswordUseCase.name);

  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService, 
  ) {}

  /**
   * Gửi token đặt lại mật khẩu qua email
   */
  async execute(email: string): Promise<{ message: string }> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      this.logger.warn(`Yêu cầu quên mật khẩu với email không tồn tại: ${email}`);
      throw new NotFoundException('Email không tồn tại');
    }

    // Tạo token JWT
    const resetToken = this.jwtService.sign(
      { sub: user.id },
      {
        secret: process.env.JWT_SECRET_RESET || 'reset123',
        expiresIn: '15m',
      },
    );

    // Gửi email chứa link đặt lại
    await this.emailService.sendResetPasswordEmail(email, resetToken);

    return { message: 'Đã gửi mã xác nhận qua email' };
  }
}
