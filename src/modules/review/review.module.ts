import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReviewEntity } from './domain/review.entity';
import { ReviewController } from './infrastructure/controllers/review.controller';
import { CreateReviewUseCase } from './application/use-cases/create-review.use-case';
import { GetReviewsByTourUseCase } from './application/use-cases/get-reviews-by-tour.use-case';
import { TypeOrmReviewRepository } from './infrastructure/repositories/typeorm-review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  controllers: [ReviewController],
  providers: [
    {
      provide: 'ReviewRepository',
      useClass: TypeOrmReviewRepository,
    },
    CreateReviewUseCase,
    GetReviewsByTourUseCase,
  ],
})
export class ReviewModule {}
