import { Inject } from '@nestjs/common';
import { HomestayRepository } from '../ports/homestay.repository';
import { HomestayEntity } from '../../domain/homestay.entity';

export class SearchHomestaysUseCase {
  constructor(
    @Inject('HomestayRepository')
    private readonly homestayRepository: HomestayRepository,
  ) {}

  async execute(params: {
    city?: string;
    country?: string;
    checkIn?: Date;
    checkOut?: Date;
    minPrice?: number;
    maxPrice?: number;
    guests?: number;
  }): Promise<HomestayEntity[]> {
    return this.homestayRepository.search(params);
  }
}
