import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HomestayEntity } from './domain/homestay.entity';
import { HomestayController } from './infrastructure/controllers/homestay.controller';
import { TypeOrmHomestayRepository } from './infrastructure/repositories/typeorm-homestay.repository';
import { GetHomestayListUseCase } from './application/use-cases/get-homestay-list.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([HomestayEntity])],
  controllers: [HomestayController],
  providers: [
    {
      provide: 'HomestayRepository',
      useClass: TypeOrmHomestayRepository,
    },
    GetHomestayListUseCase,
  ],
})
export class HomestayModule {}
