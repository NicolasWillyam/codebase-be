import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TourEntity } from '../../domain/tour.entity';
import { TourRepository } from '../../application/ports/tour.repository';
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

  // ======= Search & Query ==========
  async searchTours(query: ListToursQueryDto): Promise<{
    data: TourListItemDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { keyword, page = 1, limit = 10 } = query;

    const where = keyword ? { name: Like(`%${keyword}%`) } : {};

    const [entities, total] = await this.tourRepo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { name: 'ASC' },
      select: ['id', 'name', 'thumbnail', 'shortDescription', 'price'],
    });

    const data = entities.map(this.mapToListItemDto);

    return { data, total, page, limit };
  }

  async getAllTours(): Promise<TourListItemDto[]> {
    const tours = await this.tourRepo.find({
      select: ['id', 'name', 'thumbnail', 'shortDescription', 'price'],
    });
    return tours.map(this.mapToListItemDto);
  }

  async getTourById(id: string): Promise<TourDetailDto | null> {
    const tour = await this.tourRepo.findOneBy({ id });
    return tour ? this.mapToDetailDto(tour) : null;
  }

  // ======= Commands ================
  async createTour(dto: CreateTourDto): Promise<TourEntity> {
    const entity = this.tourRepo.create(dto);
    return this.tourRepo.save(entity);
  }

  async updateTour(id: string, dto: UpdateTourDto): Promise<void> {
    await this.tourRepo.update(id, dto);
  }

  async deleteTour(id: string): Promise<void> {
    await this.tourRepo.delete(id);
  }

  // ======= Mappers ================
  private mapToListItemDto(entity: TourEntity): TourListItemDto {
    return {
      id: entity.id,
      name: entity.name,
      thumbnail: entity.thumbnail,
      shortDescription: entity.shortDescription,
      price: entity.price,
    };
  }

  private mapToDetailDto(entity: TourEntity): TourDetailDto {
    return {
      id: entity.id,
      name: entity.name,
      thumbnail: entity.thumbnail,
      shortDescription: entity.shortDescription,
      fullDescription: entity.fullDescription,
      schedule: entity.schedule,
      services: entity.services,
      price: entity.price,
    };
  }
}
