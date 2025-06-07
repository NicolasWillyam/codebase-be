import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class RateTourDto {
  @IsString()
  @IsNotEmpty()
  tourId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
