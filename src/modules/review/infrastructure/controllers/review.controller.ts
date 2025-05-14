import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateReviewDto } from '../dto/create-review.dto';
import { CreateReviewUseCase } from '../../application/use-cases/create-review.use-case';
import { GetReviewsByTourUseCase } from '../../application/use-cases/get-reviews-by-tour.use-case';

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly createReviewUC: CreateReviewUseCase,
    private readonly getReviewsByTourUC: GetReviewsByTourUseCase,
  ) {}

  // POST /reviews
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateReviewDto) {
    const review = await this.createReviewUC.execute(dto);
    return {
      status: 'success',
      message: 'Review submitted successfully',
      data: review,
    };
  }

  // GET /reviews?tourId=abc123
  @Get()
  async getByTour(@Query('tourId') tourId: string) {
    const reviews = await this.getReviewsByTourUC.execute(tourId);
    return {
      status: 'success',
      data: reviews,
    };
  }
}
