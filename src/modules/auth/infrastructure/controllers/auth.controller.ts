import {Body, Controller, Post, Patch, Req, UseGuards,} from '@nestjs/common';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { ChangePasswordUseCase } from '../../application/use-cases/change-password.use-case';
import { ForgotPasswordUseCase } from '../../application/use-cases/forgot-password.use-case';
import { ResetPasswordUseCase } from '../../application/use-cases/reset-password.use-case';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';

import { RegisterDto } from '../../dto/register.dto';
import { LoginDto } from '../../dto/login.dto';
import { ChangePasswordDto } from '../../dto/change-password.dto';
import { ForgotPasswordDto } from '../../dto/forgot-password.dto';
import { ResetPasswordDto } from '../../dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  /**
    Đăng ký tài khoản mới
    Route: POST /auth/register
   */
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.registerUseCase.execute(dto);
  }

  /**
   Đăng nhập tài khoản
   Route: POST /auth/login
   */
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto.email, dto.password);
  }

  /**
   Đổi mật khẩu (cần đăng nhập)
   Route: PATCH /auth/change-password
   */
  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    return this.changePasswordUseCase.execute(
      req.user.id,
      dto.oldPassword,
      dto.newPassword,
    );
  }

  /**
   Yêu cầu gửi email reset mật khẩu
   Route: POST /auth/forgot-password
   */
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.forgotPasswordUseCase.execute(dto.email);
  }

  /**
   Đặt lại mật khẩu bằng token từ email
   Route: POST /auth/reset-password
   */
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.resetPasswordUseCase.execute(dto.token, dto.newPassword);
  }
}
