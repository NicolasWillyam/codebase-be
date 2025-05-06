import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';

// UseCase gửi email chứa token reset mật khẩu
@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new NotFoundException('Email không tồn tại');

    // Tạo token reset riêng biệt, có hạn sử dụng ngắn
    const resetToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_SECRET_RESET || 'reset123', expiresIn: '15m' },
    );

    // Gửi email thật tại đây (tạm log để kiểm thử)
    console.log(`Reset password token for ${email}: ${resetToken}`);

    return { message: 'Đã gửi mã xác nhận qua email (tạm in log)' };
  }
}
