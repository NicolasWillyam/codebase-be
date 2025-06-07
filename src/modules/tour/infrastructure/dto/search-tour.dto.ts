import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class SearchTourDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @IsString()
  sortBy?: 'price' | 'name';

  @IsOptional()
  @IsString()
  sortDirection?: 'asc' | 'desc';
}
