import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('homestays')
export class HomestayEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  pricePerNight: number;

  @Column({ type: 'text', array: true })
  amenities: string[]; // tiện nghi: ["Wifi", "Điều hòa", "Máy sấy", ...]

  @Column({ type: 'text', array: true })
  images: string[]; // danh sách URL ảnh

  @Column()
  location: string; // ví dụ: "Đà Lạt", "Sapa",...

  @CreateDateColumn()
  createdAt: Date;
}
