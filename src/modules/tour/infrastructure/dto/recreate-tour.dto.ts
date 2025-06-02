import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTourDto {
  // Tên tour - bắt buộc và phải là chuỗi
  @IsString()
  @IsNotEmpty()
  name: string;

  // Đường dẫn ảnh đại diện tour - phải là chuỗi
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  // Mô tả ngắn về tour - phải là chuỗi
  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  // Mô tả đầy đủ về tour - phải là chuỗi
  @IsString()
  @IsNotEmpty()
  fullDescription: string;

  // Lịch trình của tour - phải là chuỗi
  @IsString()
  @IsNotEmpty()
  schedule: string;

  // Các dịch vụ bao gồm - phải là chuỗi
  @IsString()
  @IsNotEmpty()
  services: string;

  // Giá tour - bắt buộc và phải là số
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
