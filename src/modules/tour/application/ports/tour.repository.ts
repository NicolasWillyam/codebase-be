// Giao diện định nghĩa các hành vi mà lớp repository cần triển khai (ví dụ: lấy danh sách tour, chi tiết tour, tạo/sửa tour...).
import { TourListItemDto } from '../../infrastructure/dto/tour-list-item.dto';
import { TourDetailDto } from '../../infrastructure/dto/tour-detail.dto';
import { CreateTourDto } from '../../infrastructure/dto/create-tour.dto';
import { UpdateTourDto } from '../../infrastructure/dto/update-tour.dto';
import { ListToursQueryDto } from '../../infrastructure/dto/list-tours-query.dto';
import { TourEntity } from '../../domain/tour.entity';

export interface TourRepository {
  getAllTours(): Promise<TourListItemDto[]>;
  getTourById(id: string): Promise<TourDetailDto>;
  createTour(dto: CreateTourDto): Promise<TourEntity>;
  updateTour(id: string, dto: UpdateTourDto): Promise<void>;
  deleteTour(id: string): Promise<void>;
  searchTours(query: ListToursQueryDto): Promise<{
    data: TourListItemDto[];
    total: number;
    page: number;
    limit: number;
  }>;
}
