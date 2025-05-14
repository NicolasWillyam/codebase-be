import { IsInt, IsString, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  tourId: string;

  @IsNotEmpty()
  fullName: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comment: string;
}
