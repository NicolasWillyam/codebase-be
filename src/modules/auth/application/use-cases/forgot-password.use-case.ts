import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string) {
    //Kiểm tra xem email có tồn tại không
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Email không tồn tại trong hệ thống');
    }

    //Tạo token reset mật khẩu, dùng secret riêng và hạn sử dụng ngắn
    const resetToken = this.generateResetToken(user.id);

    //Gửi email chứa link/token 
    const resetLink = `https://yourdomain.com/reset-password?token=${resetToken}`;
    console.log(`Gửi token đặt lại mật khẩu cho ${email}: ${resetLink}`);

    return {
      success: true,
      message: 'Nếu email hợp lệ, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu.',
    };
  }

  private generateResetToken(userId: string): string {
    return this.jwtService.sign(
      { sub: userId },
      {
        secret: process.env.JWT_SECRET_RESET || 'default_reset_secret',
        expiresIn: '15m',
      },
    );
  }
}
