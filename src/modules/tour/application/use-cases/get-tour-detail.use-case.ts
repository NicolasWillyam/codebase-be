import { Inject, Injectable } from '@nestjs/common';
import { TourRepository } from '../ports/tour.repository';
import { TourDetailDto } from '../../infrastructure/dto/tour-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TourEntity } from '../../domain/tour.entity';

@Injectable()
export class GetTourDetailUseCase {
  constructor(
    @Inject('TourRepository')
    private readonly tourRepo: TourRepository,
  ) {}

  async execute(id: string): Promise<TourDetailDto> {
    const detail = await this.tourRepo.getTourById(id); // lấy lại đúng định dạng DTO chi tiết
    return detail;
  }
}
// // Gọi use case này trong controller để lấy chi tiết tour.
