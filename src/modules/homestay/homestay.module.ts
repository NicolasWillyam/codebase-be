import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HomestayEntity } from './domain/homestay.entity';
import { AdminHomestayController } from './infrastructure/controllers/admin-homestay.controller';
import { HomestayController } from './infrastructure/controllers/homestay.controller';
import { TypeOrmHomestayRepository } from './infrastructure/repositories/typeorm-homestay.repository';
import { GetHomestayListUseCase } from './application/use-cases/get-homestay-list.use-case';
import { GetHomestayListAdminUseCase } from './application/use-cases/get-homestay-list-admin.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([HomestayEntity])],
  controllers: [HomestayController,AdminHomestayController],
  providers: [
    {
      provide: 'HomestayRepository',
      useClass: TypeOrmHomestayRepository,
    },
    GetHomestayListUseCase,
    GetHomestayListAdminUseCase,
  ],
})
export class HomestayModule {}
