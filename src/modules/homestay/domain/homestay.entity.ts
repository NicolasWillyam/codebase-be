import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('homestays')
export class HomestayEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  slug?: string;

  @Column('text')
  description: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column('simple-array') // store comma-separated image URLs
  images: string[];

  @Column('jsonb')
  rooms: {
    guestCount: number;
    bedroomCount: number;
    bedCount: number;
    bathroomCount: number;
    floor: number;
    hasKitchen: boolean;
    hasLivingRoom: boolean;
  };

  @Column('jsonb')
  amenities: {
    icon: string;
    label: string;
    category?: string;
  }[];

  @Column({ default: false })
  isFavorite: boolean;

  @Column('int')
  pricePerNight: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
