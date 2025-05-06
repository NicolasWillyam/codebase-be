import { IsString, MinLength } from 'class-validator';

// DTO dùng để đổi mật khẩu, yêu cầu người dùng nhập mật khẩu cũ và mới
export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  oldPassword: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}
