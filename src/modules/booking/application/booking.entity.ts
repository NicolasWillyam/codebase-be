import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { TourEntity } from '@/modules/tour/domain/tour.entity';
import { HomestayEntity } from '@/modules/homestay/domain/homestay.entity';
import { BookingStatus } from './constants/booking-status.enum';

@Entity('bookings')
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  // Loại booking: 'tour' | 'homestay'
  @Column()
  type: 'tour' | 'homestay';

  // Booking tour
  @Column({ nullable: true })
  tourId?: string;

  @ManyToOne(() => TourEntity, { nullable: true })
  @JoinColumn({ name: 'tourId' })
  tour?: TourEntity;

  // Booking homestay
  @Column({ nullable: true })
  homestayId?: string;

  @ManyToOne(() => HomestayEntity, { nullable: true })
  @JoinColumn({ name: 'homestayId' })
  homestay?: HomestayEntity;

  // Dùng cho homestay
  @Column({ type: 'date', nullable: true })
  checkInDate?: Date;

  @Column({ type: 'date', nullable: true })
  checkOutDate?: Date;

  @Column()
  numberOfGuests: number;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.Pending })
  status: BookingStatus;

  @CreateDateColumn()
  createdAt: Date;
}
