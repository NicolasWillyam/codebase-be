import { HomestayEntity } from '../../domain/homestay.entity';
import { HomestaySearchQueryDto } from '../../domain/dto/homestay-search-query.dto';
import { CreateHomestayDto } from '../../domain/dto/create-homestay.dto';
import { UpdateHomestayDto } from '../../domain/dto/update-homestay.dto';

export abstract class HomestayRepository {
  abstract create(dto: CreateHomestayDto): Promise<HomestayEntity>;
  abstract findAll(query: HomestaySearchQueryDto): Promise<HomestayEntity[]>;
  abstract findById(id: string): Promise<HomestayEntity>;
  abstract update(id: string, dto: UpdateHomestayDto): Promise<HomestayEntity>;
  abstract delete(id: string): Promise<void>;
  abstract search(params: {
    city?: string;
    country?: string;
    checkIn?: Date;
    checkOut?: Date;
    minPrice?: number;
    maxPrice?: number;
    guests?: number;
  }): Promise<HomestayEntity[]>;
}
