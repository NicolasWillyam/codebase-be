import { Injectable } from '@nestjs/common';
import { TourRepository } from '../ports/tour.repository';
import { UpdateTourDto } from '../../infrastructure/dto/update-tour.dto';
import { TourEntity } from '../../domain/tour.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UpdateTourUseCase {
  constructor(
    @InjectRepository(TourEntity)
    private readonly tourRepo: TourRepository,
  ) {}

  async execute(id: string, dto: UpdateTourDto): Promise<void> {
    await this.tourRepo.updateTour(id, dto);
  }
}
