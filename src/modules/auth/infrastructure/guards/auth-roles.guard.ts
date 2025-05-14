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

@Injectable()
export class AuthRolesGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Check JWT (AuthGuard logic)
    const can = await super.canActivate(context);
    if (!can) return false;

    // 2. Get required roles
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 3. Check if user has at least one required role
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) throw new ForbiddenException('You do not have permission');

    return true;
  }
}
