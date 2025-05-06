import { IsEmail, MinLength } from 'class-validator';

// DTO cho người dùng nhập email + password để login
export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
