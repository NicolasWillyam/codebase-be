import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { HomestayRepository } from '../../application/ports/homestay.repository';
import { HomestayEntity } from '../../domain/homestay.entity';
import { HomestaySearchQueryDto } from '../dto/homestay-search-query.dto';

@Injectable()
export class TypeOrmHomestayRepository implements HomestayRepository {
  constructor(
    @InjectRepository(HomestayEntity)
    private readonly homestayRepo: Repository<HomestayEntity>,
  ) {}

  async getHomestays(query: HomestaySearchQueryDto): Promise<HomestayEntity[]> {
    const qb = this.homestayRepo.createQueryBuilder('homestay');

    if (query.location) {
      qb.andWhere('homestay.location ILIKE :location', {
        location: `%${query.location}%`,
      });
    }

    if (query.maxPrice) {
      qb.andWhere('homestay.pricePerNight <= :maxPrice', {
        maxPrice: query.maxPrice,
      });
    }

    if (query.keyword) {
      qb.andWhere(
        '(homestay.name ILIKE :keyword OR homestay.description ILIKE :keyword)',
        { keyword: `%${query.keyword}%` },
      );
    }

    return qb.orderBy('homestay.createdAt', 'DESC').getMany();
  }
}
