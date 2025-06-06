import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../../domain/user-role.enum';

/**
 * Guard kiểm tra xác thực (JWT) và phân quyền theo vai trò người dùng
 */
@Injectable()
export class AuthRolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * Hàm thực hiện xác thực và kiểm tra quyền truy cập
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Kiểm tra xác thực JWT 
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) return false;

    // Lấy ra danh sách role yêu cầu 
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Nếu route không yêu cầu role cụ thể → cho phép qua
    if (!requiredRoles || requiredRoles.length === 0) return true;

    // Lấy user từ request đã được decode 
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    //  Kiểm tra user có role phù hợp không
    const hasRequiredRole = requiredRoles.includes(user.role);
    if (!hasRequiredRole) {
      throw new ForbiddenException('Bạn không có quyền truy cập tài nguyên này');
    }

    return true;
  }
}
