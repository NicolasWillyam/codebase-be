import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TourController } from './infrastructure/controllers/tour.controller';
import { TypeOrmTourRepository } from './infrastructure/repositories/typeorm-tour.repository';

import { ListToursUseCase } from './application/use-cases/list-tours.use-case';
import { GetTourDetailUseCase } from './application/use-cases/get-tour-detail.use-case';
import { CreateTourUseCase } from './application/use-cases/create-tour.use-case';
import { UpdateTourUseCase } from './application/use-cases/update-tour.use-case';
import { DeleteTourUseCase } from './application/use-cases/delete-tour.use-case';
import { TourEntity } from './domain/tour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TourEntity])],
  controllers: [TourController],
  providers: [
    {
      provide: 'TourRepository', // <-- Token inject
      useClass: TypeOrmTourRepository, // <-- Class thật để dùng
    },
    ListToursUseCase,
    GetTourDetailUseCase,
    CreateTourUseCase,
    UpdateTourUseCase,
    DeleteTourUseCase,
  ],
})
export class TourModule {}
