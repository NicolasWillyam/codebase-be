// src/modules/user/domain/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '@/modules/auth/domain/user-role.enum';

// Entity ánh xạ với bảng "users" trong PostgreSQL
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // ID tự sinh

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Lưu mật khẩu đã hash

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;
}
