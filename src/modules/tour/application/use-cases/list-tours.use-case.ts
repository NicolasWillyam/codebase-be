import { Inject, Injectable } from '@nestjs/common';
import { TourRepository } from '../ports/tour.repository';
import { TourListItemDto } from '../../infrastructure/dto/tour-list-item.dto';
import { ListToursQueryDto } from '../../infrastructure/dto/list-tours-query.dto';

@Injectable()
export class ListToursUseCase {
  constructor(
    @Inject('TourRepository')
    private readonly tourRepo: TourRepository,
  ) {}

  async execute(query: ListToursQueryDto): Promise<{
    data: TourListItemDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.tourRepo.searchTours(query);
  }
}
