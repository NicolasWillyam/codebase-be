import { Inject, Injectable } from '@nestjs/common';
import { ReviewRepository } from '../ports/review.repository';
import { ReviewEntity } from '../../domain/review.entity';

@Injectable()
export class GetReviewsByTourUseCase {
  constructor(
    @Inject('ReviewRepository')
    private readonly reviewRepo: ReviewRepository,
  ) {}

  async execute(tourId: string): Promise<ReviewEntity[]> {
    return this.reviewRepo.getReviewsByTour(tourId);
  }
}
