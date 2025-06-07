// domain/entities/tour.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tours' })
export class TourEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  thumbnail: string;

  @Column({ name: 'short_description', type: 'text' })
  shortDescription: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'full_description', type: 'text' })
  fullDescription: string;

  @Column({ type: 'text' })
  schedule: string;

  @Column({ type: 'text' })
  services: string;
}
