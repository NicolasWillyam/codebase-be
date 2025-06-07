import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '@/modules/auth/domain/user-role.enum';

/**
 * Entity đại diện cho người dùng trong hệ thống.
 * Mỗi instance của class này sẽ ánh xạ tới một dòng (record) trong bảng "users".
 */
@Entity('users')
export class User {
  /**
   * Khoá chính (primary key) dạng UUID, được tự động sinh.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Email người dùng – giá trị duy nhất, dùng để đăng nhập.
   */
  @Column({ unique: true })
  email: string;

  /**
   * Mật khẩu của người dùng – được lưu dưới dạng hash (đã mã hoá).
   */
  @Column()
  password: string;

  /**
   * Tên đầy đủ của người dùng – có thể là tên hiển thị trong profile.
   */
  @Column()
  name: string;

  /**
   * Vai trò (role) của người dùng trong hệ thống.
   * Có thể là Admin, User, Moderator,... tuỳ thuộc enum UserRole định nghĩa.
   * Mặc định là User.
   */
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;
}

