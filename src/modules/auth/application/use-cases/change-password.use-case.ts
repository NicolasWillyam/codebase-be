import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

@Injectable()
export class ChangePasswordUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UnauthorizedException('Tài khoản không tồn tại');

    // So sánh mật khẩu cũ với DB
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new UnauthorizedException('Mật khẩu cũ không đúng');

    const hashed = await bcrypt.hash(newPassword, 10);
    await this.userRepo.updatePassword(userId, hashed);

    return { message: 'Đổi mật khẩu thành công' };
  }
}
