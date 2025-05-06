// src/modules/auth/infrastructure/dto/register.dto.ts

import { IsEmail, IsString, MinLength } from 'class-validator';

// DTO định nghĩa dữ liệu đầu vào cho API /auth/register
export class RegisterDto {
  @IsEmail()
  email: string; // Email phải đúng định dạng

  @IsString()
  @MinLength(6)
  password: string; // Mật khẩu ít nhất 6 ký tự

  @IsString()
  name: string; // Tên người dùng
}
