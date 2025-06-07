import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateTourDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'Thumbnail must be a valid URL' })
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  fullDescription: string;

  @IsString()
  @IsNotEmpty()
  schedule: string;

  @IsString()
  @IsNotEmpty()
  services: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price must be a valid number with up to 2 decimal places' })
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;
}
