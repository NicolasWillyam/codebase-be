import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ListToursQueryDto {
  // Từ khóa tìm kiếm (tùy chọn)
  @IsOptional()
  @IsString()
  keyword?: string;

  // Số trang (tùy chọn, mặc định là 1, phải là số nguyên >= 1)
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  // Giới hạn số phần tử mỗi trang (tùy chọn, mặc định là 10, phải là số nguyên >= 1)
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;
}
