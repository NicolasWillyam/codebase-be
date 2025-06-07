import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { TourDetailDto } from '../../infrastructure/dto/tour-detail.dto';
import { TourRepository } from '../../application/ports/tour.repository';

@Injectable()
export class GetTourDetailUseCase {
  private readonly logger = new Logger(GetTourDetailUseCase.name);

  constructor(
    @Inject('TourRepository')
    private readonly tourRepository: TourRepository,
  ) {}

  async execute(tourId: string): Promise<TourDetailDto> {
    this.logger.debug(`Getting detail for tour with ID: ${tourId}`);

    const tour = await this.tourRepository.getTourById(tourId);

    if (!tour) {
      this.logger.warn(`Tour with ID ${tourId} not found`);
      throw new NotFoundException(`Tour với ID ${tourId} không tồn tại`);
    }

    return TourDetailDto.fromEntity(tour); // Giả sử bạn có static method để map
  }
}
export class TourDetailDto {
  id: string;
  name: string;
  thumbnail: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  schedule: string;
  services: string;

  static fromEntity(entity: TourEntity): TourDetailDto {
    return {
      id: entity.id,
      name: entity.name,
      thumbnail: entity.thumbnail,
      shortDescription: entity.shortDescription,
      fullDescription: entity.fullDescription,
      price: entity.price,
      schedule: entity.schedule,
      services: entity.services,
    };
  }
}
