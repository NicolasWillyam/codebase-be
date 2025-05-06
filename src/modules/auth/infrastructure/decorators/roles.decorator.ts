import { SetMetadata } from '@nestjs/common';

// Khóa metadata để NestJS lấy role từ handler
export const ROLES_KEY = 'roles';

// Decorator để gắn role vào route
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
