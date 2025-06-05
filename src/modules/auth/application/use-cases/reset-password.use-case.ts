import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResetPasswordUseCase {
  // Tạo logger để ghi log các sự kiện trong lớp này
  private readonly logger = new Logger(ResetPasswordUseCase.name);

  constructor(
    private readonly jwtService: JwtService,       
    private readonly userRepo: UserRepository,     
  ) {}

  // Hàm reset mật khẩu
  async execute(token: string, newPassword: string) {
    let payload: any;

    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_RESET || 'reset123', 
      });
    } catch (error) {
      // Token không hợp lệ hoặc hết hạn 
      this.logger.warn(`Token reset không hợp lệ hoặc hết hạn`);
      throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
    }

    // Ghi log token hợp lệ
    this.logger.log(`Token hợp lệ - Tiến hành cập nhật mật khẩu cho userId: ${payload.sub}`);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepo.updatePassword(payload.sub, hashedPassword);
    this.logger.log(`Mật khẩu đã được đặt lại thành công cho userId: ${payload.sub}`);
    return { message: 'Đặt lại mật khẩu thành công' };
  }
}
