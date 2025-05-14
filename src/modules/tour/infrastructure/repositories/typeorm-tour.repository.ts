import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TourRepository } from '../../application/ports/tour.repository';
import { TourEntity } from '../../domain/tour.entity';
import { TourListItemDto } from '../dto/tour-list-item.dto';
import { TourDetailDto } from '../dto/tour-detail.dto';
import { CreateTourDto } from '../dto/create-tour.dto';
import { UpdateTourDto } from '../dto/update-tour.dto';
import { ListToursQueryDto } from '../dto/list-tours-query.dto';

@Injectable()
export class TypeOrmTourRepository implements TourRepository {
  constructor(
    @InjectRepository(TourEntity)
    private readonly tourRepo: Repository<TourEntity>,
  ) {}

  async searchTours(query: ListToursQueryDto): Promise<{
    data: TourListItemDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { keyword, page = 1, limit = 10 } = query;

    const where = keyword ? { name: Like(`%${keyword}%`) } : {};

    const [data, total] = await this.tourRepo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      select: ['id', 'name', 'thumbnail', 'shortDescription', 'price'],
      order: { name: 'ASC' },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getTourById(id: string): Promise<TourDetailDto> {
    const tour = await this.tourRepo.findOneBy({ id });
    if (!tour) return null;

    return {
      id: tour.id,
      name: tour.name,
      thumbnail: tour.thumbnail,
      shortDescription: tour.shortDescription,
      fullDescription: tour.fullDescription,
      schedule: tour.schedule,
      services: tour.services,
      price: tour.price,
    };
  }

  async getAllTours(): Promise<TourListItemDto[]> {
    return this.tourRepo.find({
      select: ['id', 'name', 'thumbnail', 'shortDescription', 'price'],
    });
  }

  async createTour(dto: CreateTourDto): Promise<TourEntity> {
    const newTour = this.tourRepo.create(dto);
    return await this.tourRepo.save(newTour);
  }

  async updateTour(id: string, dto: UpdateTourDto): Promise<void> {
    await this.tourRepo.update(id, dto);
  }

  async deleteTour(id: string): Promise<void> {
    await this.tourRepo.delete(id);
  }
}
