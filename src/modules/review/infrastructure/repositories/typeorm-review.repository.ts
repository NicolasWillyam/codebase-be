import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewRepository } from '../../application/ports/review.repository';
import { ReviewEntity } from '../../domain/review.entity';
import { CreateReviewDto } from '../dto/create-review.dto';

@Injectable()
export class TypeOrmReviewRepository implements ReviewRepository {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepo: Repository<ReviewEntity>,
  ) {}

  async createReview(dto: CreateReviewDto): Promise<ReviewEntity> {
    const review = this.reviewRepo.create(dto);
    return await this.reviewRepo.save(review);
  }

  async getReviewsByTour(tourId: string): Promise<ReviewEntity[]> {
    return this.reviewRepo.find({
      where: { tourId },
      order: { createdAt: 'DESC' },
    });
  }
}
