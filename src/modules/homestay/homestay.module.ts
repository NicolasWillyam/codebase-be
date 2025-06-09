import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmHomestayRepository } from './infrastructure/repositories/typeorm-homestay.repository';
import { GetHomestayListUseCase } from './application/use-cases/get-homestay-list.use-case';
import { HomestayController } from './interfaces/controllers/homestay.controller';
import { HomestayEntity } from './domain/homestay.entity';
import { CreateHomestayUseCase } from './application/use-cases/create-homestay.use-case';
import { GetHomestayDetailUseCase } from '../booking/application/use-cases/get-homestay-detail.use-case';
import { UpdateHomestayUseCase } from './application/use-cases/update-homestay.use-case';
import { DeleteHomestayUseCase } from './application/use-cases/delete-homestay.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([HomestayEntity])],
  controllers: [HomestayController],
  providers: [
    {
      provide: 'HomestayRepository',
      useClass: TypeOrmHomestayRepository,
    },
    CreateHomestayUseCase,
    GetHomestayListUseCase,
    GetHomestayDetailUseCase,
    UpdateHomestayUseCase,
    DeleteHomestayUseCase,
  ],
})
export class HomestayModule {}
