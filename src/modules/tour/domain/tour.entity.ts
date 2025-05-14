// domain/entities/tour.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tours')
export class TourEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  thumbnail: string;

  @Column({ name: 'short_description' })
  shortDescription: string;

  @Column()
  price: number;

  @Column({ name: 'full_description' })
  fullDescription: string;

  @Column()
  schedule: string;

  @Column()
  services: string;
}
