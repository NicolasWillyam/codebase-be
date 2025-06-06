import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../../dto/register.dto';
import { UserRole } from '../../domain/user-role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUseCase {
  private readonly logger = new Logger(RegisterUseCase.name);
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: RegisterDto) {
    await this.ensureEmailNotExists(input.email);

    const hashedPassword = await this.hashPassword(input.password);

    const newUser = await this.createUser(input, hashedPassword);

    const accessToken = this.generateToken(newUser);

    this.logger.log(`📥 Tài khoản mới đã được tạo: ${newUser.email}`);

    return { access_token: accessToken };
  }

  //kiem tra email da duoc dung chua
  private async ensureEmailNotExists(email: string): Promise<void> {
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      this.logger.warn(` Email đã tồn tại: ${email}`);
      throw new ConflictException('Email đã được sử dụng');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  private async createUser(input: RegisterDto, hashedPassword: string) {
    return this.userRepo.createUser({
      email: input.email,
      name: input.name,
      password: hashedPassword,
      role: UserRole.User,
    });
  }

  private generateToken(user: any): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }
}
