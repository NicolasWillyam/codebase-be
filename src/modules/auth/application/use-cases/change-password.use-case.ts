import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

@Injectable()
export class ChangePasswordUseCase {
  private readonly SALT_ROUNDS = 10;

  constructor(private readonly userRepo: UserRepository) {}

  async execute(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.findUserOrThrow(userId);
    await this.ensureOldPasswordMatches(oldPassword, user.password);

    const hashedPassword = await this.hashPassword(newPassword);
    await this.userRepo.updatePassword(userId, hashedPassword);

    return {
      success: true,
      message: 'Đổi mật khẩu thành công',
    };
  }

  private async findUserOrThrow(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundException('Không tìm thấy tài khoản');
    }
    return user;
  }

  private async ensureOldPasswordMatches(inputPassword: string, storedHashedPassword: string) {
    const isMatch = await bcrypt.compare(inputPassword, storedHashedPassword);
    if (!isMatch) {
      throw new UnauthorizedException('Mật khẩu cũ không đúng');
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }
}
