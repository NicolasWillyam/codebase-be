// src/modules/booking/booking.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Make sure to import TypeOrmModule
import { GetHomestayDetailUseCase } from './application/use-cases/get-homestay-detail.use-case';
import { HomestayEntity } from '../homestay/domain/homestay.entity'; // <-- IMPORTANT: Import HomestayEntity
import { TypeOrmHomestayRepository } from '../homestay/infrastructure/repositories/typeorm-homestay.repository'; // <-- IMPORTANT: Import the concrete TypeORM repository
import { HomestayRepository } from '../homestay/application/ports/homestay.repository'; // <-- IMPORTANT: Import the interface/abstract class

@Module({
  imports: [
    // Register HomestayEntity with TypeORM for THIS module's context
    TypeOrmModule.forFeature([HomestayEntity]),
  ],
  providers: [
    // Provide the HomestayRepository implementation using the string token
    {
      provide: 'HomestayRepository',
      useClass: TypeOrmHomestayRepository,
    },
    // Provide the use case within its "home" module
    GetHomestayDetailUseCase,
    // ... any other booking-related providers
  ],
  exports: [
    // Export the use case if other modules need to inject it
    GetHomestayDetailUseCase,
    // Export the repository token if other modules need to inject it directly
    'HomestayRepository',
  ],
})
export class BookingModule {}
