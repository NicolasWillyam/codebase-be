import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HomestayEntity } from './domain/homestay.entity'; // Entity đại diện cho bảng homestay
import { HomestayController } from './infrastructure/controllers/homestay.controller'; // Controller xử lý các HTTP request
import { TypeOrmHomestayRepository } from './infrastructure/repositories/typeorm-homestay.repository'; // Repository cụ thể sử dụng TypeORM
import { GetHomestayListUseCase } from './application/use-cases/get-homestay-list.use-case'; // Use case lấy danh sách homestay

@Module({
  // Import entity để TypeORM có thể làm việc với cơ sở dữ liệu
  imports: [TypeOrmModule.forFeature([HomestayEntity])],

  // Khai báo controller xử lý route
  controllers: [HomestayController],

  // Khai báo provider (repository + use case)
  providers: [
    {
      provide: 'HomestayRepository', // Định nghĩa token "HomestayRepository"
      useClass: TypeOrmHomestayRepository, // Gắn implementation cụ thể
    },
    GetHomestayListUseCase, // Use case để xử lý logic nghiệp vụ
  ],
})
export class HomestayModule {}
