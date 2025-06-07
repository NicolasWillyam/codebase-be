import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    // Lọc theo location
    if (query.location) {
      qb.andWhere('homestay.location ILIKE :location', {
        location: `%${query.location}%`,
      });
    }

    // Lọc theo maxPrice
    if (query.maxPrice) {
      qb.andWhere('homestay.pricePerNight <= :maxPrice', {
        maxPrice: query.maxPrice,
      });
    }

    // Lọc theo keyword (tìm kiếm trong tên hoặc mô tả)
    if (query.keyword) {
      qb.andWhere(
        '(homestay.name ILIKE :keyword OR homestay.description ILIKE :keyword)',
        { keyword: `%${query.keyword}%` },
      );
    }

    // Lọc theo amenities (tìm kiếm tiện nghi)
    if (query.amenities && query.amenities.length > 0) {
      qb.andWhere('homestay.amenities @> :amenities', {
        amenities: `{${query.amenities.join(',')}}`, // Chuỗi này sẽ chuyển thành mảng trong PostgreSQL
      });
    }

    qb.orderBy('homestay.createdAt', 'DESC');

    // Phân trang
    if (query.page && query.limit) {
      qb.take(query.limit).skip((query.page - 1) * query.limit);
    }

    // Trả về kết quả tìm kiếm
    return qb.getMany();
  }
}
