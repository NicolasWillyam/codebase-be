import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';
import * as bcrypt from 'bcrypt';

// UseCase dùng token để xác nhận, và đặt lại mật khẩu mới
@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(token: string, newPassword: string) {
    let payload;
    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_RESET || 'reset123',
      });
    } catch (e) {
      throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await this.userRepo.updatePassword(payload.sub, hashed);

    return { message: 'Đặt lại mật khẩu thành công' };
  }
}
