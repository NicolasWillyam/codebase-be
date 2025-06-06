import { IsOptional, IsNumber, IsPositive } from 'class-validator';

export class GetHotToursDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit?: number; // số lượng tour hot muốn lấy, mặc định có thể là 5
}
