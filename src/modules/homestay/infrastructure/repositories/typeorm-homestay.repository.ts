import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { HomestayRepository } from '../../application/ports/homestay.repository';
import { HomestayEntity } from '../../domain/homestay.entity';
import { HomestaySearchQueryDto } from '../../domain/dto/homestay-search-query.dto';
import { CreateHomestayDto } from '../../domain/dto/create-homestay.dto';
import { UpdateHomestayDto } from '../../domain/dto/update-homestay.dto';

@Injectable()
export class TypeOrmHomestayRepository implements HomestayRepository {
  constructor(
    @InjectRepository(HomestayEntity)
    private readonly repo: Repository<HomestayEntity>,
  ) {}

  create(dto: CreateHomestayDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find();
  }

  async findById(id: string): Promise<HomestayEntity | undefined> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateHomestayDto): Promise<HomestayEntity> {
    await this.repo.update(id, dto);
    return this.repo.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async search(params): Promise<HomestayEntity[]> {
    const query = this.repo.createQueryBuilder('homestay');

    if (params.city)
      query.andWhere('homestay.city = :city', { city: params.city });
    if (params.country)
      query.andWhere('homestay.country = :country', {
        country: params.country,
      });
    if (params.minPrice)
      query.andWhere('homestay.pricePerNight >= :minPrice', {
        minPrice: params.minPrice,
      });
    if (params.maxPrice)
      query.andWhere('homestay.pricePerNight <= :maxPrice', {
        maxPrice: params.maxPrice,
      });
    if (params.guests)
      query.andWhere(`(homestay.rooms ->> 'guestCount')::int >= :guests`, {
        guests: params.guests,
      });

    const entities = await query.getMany();

    return entities;
  }
}
