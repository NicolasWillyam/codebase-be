// src/modules/auth/application/use-cases/register.use-case.ts

import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../../domain/user-role.enum';
import { RegisterDto } from '../../dto/register.dto';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: RegisterDto) {
    // 1. Kiểm tra email đã tồn tại chưa
    const existingUser = await this.userRepo.findByEmail(input.email);
    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    // 2. Mã hoá password bằng bcrypt
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // 3. Lưu user mới vào DB
    const newUser = await this.userRepo.createUser({
      email: input.email,
      name: input.name,
      password: hashedPassword,
      role: UserRole.User, // gán role mặc định
    });

    // 4. Tạo JWT access token
    const accessToken = this.jwtService.sign({
      sub: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    // 5. Trả token cho client
    return {
      access_token: accessToken,
    };
  }
}
