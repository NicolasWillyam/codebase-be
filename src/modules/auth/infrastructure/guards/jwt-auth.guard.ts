import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// Dùng strategy 'jwt' để xác thực user từ token
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
