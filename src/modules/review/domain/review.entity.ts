import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { TourEntity } from '@/modules/tour/domain/tour.entity';

@Entity('reviews')
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tourId: string;

  @ManyToOne(() => TourEntity)
  @JoinColumn({ name: 'tourId' })
  tour: TourEntity;

  @Column()
  fullName: string;

  @Column({ type: 'int' })
  rating: number; // Từ 1 đến 5

  @Column({ type: 'text' })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}
