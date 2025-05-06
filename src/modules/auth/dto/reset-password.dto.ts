import { IsString, MinLength } from 'class-validator';

// DTO dùng để reset mật khẩu với token đã gửi về email
export class ResetPasswordDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}
