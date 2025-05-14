import { Inject, Injectable } from '@nestjs/common';
import { TourRepository } from '../ports/tour.repository';
import { CreateTourDto } from '../../infrastructure/dto/create-tour.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TourEntity } from '../../domain/tour.entity';
import { TourDetailDto } from '../../infrastructure/dto/tour-detail.dto';

@Injectable()
export class CreateTourUseCase {
  constructor(
    @Inject('TourRepository')
    private readonly tourRepo: TourRepository,
  ) {}

  async execute(dto: CreateTourDto): Promise<TourDetailDto> {
    const created = await this.tourRepo.createTour(dto); // trả về entity đã lưu
    const detail = await this.tourRepo.getTourById(created.id); // lấy lại đúng định dạng DTO chi tiết
    return detail;
  }
}
