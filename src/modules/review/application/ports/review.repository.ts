// Import DTO định nghĩa dữ liệu đầu vào khi tạo đánh giá
import { CreateReviewDto } from '../../infrastructure/dto/create-review.dto';

// Import thực thể đánh giá từ tầng domain
import { ReviewEntity } from '../../domain/review.entity';

// Interface định nghĩa các phương thức mà repository đánh giá cần triển khai
export interface ReviewRepository {
  // Tạo một đánh giá mới dựa trên DTO
  createReview(dto: CreateReviewDto): Promise<ReviewEntity>;

  // Lấy danh sách đánh giá theo ID của tour
  getReviewsByTour(tourId: string): Promise<ReviewEntity[]>;
}
