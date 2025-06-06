import { IsOptional, IsString, IsNumber, Min, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class HomestaySearchQueryDto {
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[]; // Thêm trường amenities
}
