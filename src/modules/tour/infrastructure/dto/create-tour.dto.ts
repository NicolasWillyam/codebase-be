import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTourDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  thumbnail: string;

  @IsString()
  shortDescription: string;

  @IsString()
  fullDescription: string;

  @IsString()
  schedule: string;

  @IsString()
  services: string;

  @IsNumber()
  price: number;
}
