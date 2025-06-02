import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

@Injectable()
export class ChangePasswordUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(userId: string, oldPassword: string, newPassword: string) {
    //Tìm người dùng
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundException('Không tìm thấy tài khoản');
    }

    //So sánh mật khẩu cũ
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordCorrect) {
      throw new UnauthorizedException('Mật khẩu cũ không đúng');
    }

    //Hash mật khẩu mới
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    //Cập nhật mật khẩu
    await this.userRepo.updatePassword(userId, newHashedPassword);

    return {
      success: true,
      message: 'Đổi mật khẩu thành công',
    };
  }
}
