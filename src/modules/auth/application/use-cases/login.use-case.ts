import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string) {
    //Tìm người dùng theo email
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email không đúng ');
    }

    //Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Sai mật khẩu');
    }

    //Tạo JWT token
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'default_secret',
      expiresIn: '1h', // Tuỳ chỉnh thời gian hết hạn
    });

    // Trả về token + user info
    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
