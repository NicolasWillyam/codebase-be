import { IsEmail } from 'class-validator';

// DTO cho người dùng nhập email khi yêu cầu khôi phục mật khẩu
export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}
