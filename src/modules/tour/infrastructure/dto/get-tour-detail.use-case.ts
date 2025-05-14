import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TourDetailDto } from '../../infrastructure/dto/tour-detail.dto';
import { TourRepository } from '../../application/ports/tour.repository';

@Injectable()
export class GetTourDetailUseCase {
  constructor(
    @Inject('TourRepository')
    private readonly tourRepo: TourRepository,
  ) {}

  async execute(id: string): Promise<TourDetailDto> {
    const tour = await this.tourRepo.getTourById(id);

    if (!tour) {
      throw new NotFoundException('Tour không tồn tại');
    }

    return tour;
  }
}
