import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Lấy token từ Authorization Header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Khóa bí mật dùng để verify token (từ .env)
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // Hàm này trả về object sẽ được gắn vào `request.user`
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
