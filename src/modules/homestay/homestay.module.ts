// src/modules/homestay/homestay.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmHomestayRepository } from './infrastructure/repositories/typeorm-homestay.repository';
import { GetHomestayListUseCase } from './application/use-cases/get-homestay-list.use-case';
import { HomestayController } from './interfaces/controllers/homestay.controller';
import { HomestayEntity } from './domain/homestay.entity';
import { CreateHomestayUseCase } from './application/use-cases/create-homestay.use-case';
// import { GetHomestayDetailUseCase } from '../booking/application/use-cases/get-homestay-detail.use-case'; // REMOVE THIS IMPORT
import { UpdateHomestayUseCase } from './application/use-cases/update-homestay.use-case';
import { DeleteHomestayUseCase } from './application/use-cases/delete-homestay.use-case';

// If HomestayController still needs GetHomestayDetailUseCase, import BookingModule:
import { BookingModule } from '../booking/booking.module'; // <-- IMPORT BOOKING MODULE HERE
import { SearchHomestaysUseCase } from './application/use-cases/search-homestay.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([HomestayEntity]), // Keep this for other Homestay-related repositories
    BookingModule, // <-- IMPORTANT: Import BookingModule to access GetHomestayDetailUseCase
  ],
  controllers: [HomestayController],
  providers: [
    {
      provide: 'HomestayRepository', // Continue providing for other homestay use cases
      useClass: TypeOrmHomestayRepository,
    },
    CreateHomestayUseCase,
    GetHomestayListUseCase,
    // GetHomestayDetailUseCase, // REMOVE from providers (it's now in BookingModule)
    UpdateHomestayUseCase,
    DeleteHomestayUseCase,
    SearchHomestaysUseCase,
  ],
  exports: [
    'HomestayRepository', // Continue exporting for other modules if needed
    // GetHomestayDetailUseCase, // REMOVE from exports
    // Export other use cases if they are consumed by other modules
    CreateHomestayUseCase,
    GetHomestayListUseCase,
    UpdateHomestayUseCase,
    DeleteHomestayUseCase,
  ],
})
export class HomestayModule {}
