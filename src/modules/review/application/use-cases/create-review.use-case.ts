import { Inject, Injectable } from '@nestjs/common';
import { ReviewRepository } from '../ports/review.repository';
import { CreateReviewDto } from '../../infrastructure/dto/create-review.dto';
import { ReviewEntity } from '../../domain/review.entity';

@Injectable()
export class CreateReviewUseCase {
  constructor(
    @Inject('ReviewRepository')
    private readonly reviewRepo: ReviewRepository,
  ) {}

  async execute(dto: CreateReviewDto): Promise<ReviewEntity> {
    return this.reviewRepo.createReview(dto);
  }
}
