import { Injectable } from '@nestjs/common';
import { TourRepository } from '../ports/tour.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TourEntity } from '../../domain/tour.entity';

@Injectable()
export class DeleteTourUseCase {
  constructor(
    @InjectRepository(TourEntity)
    private readonly tourRepo: TourRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.tourRepo.deleteTour(id);
  }
}
