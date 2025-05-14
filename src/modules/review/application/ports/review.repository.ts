import { CreateReviewDto } from '../../infrastructure/dto/create-review.dto';
import { ReviewEntity } from '../../domain/review.entity';

export interface ReviewRepository {
  createReview(dto: CreateReviewDto): Promise<ReviewEntity>;

  getReviewsByTour(tourId: string): Promise<ReviewEntity[]>;
}
