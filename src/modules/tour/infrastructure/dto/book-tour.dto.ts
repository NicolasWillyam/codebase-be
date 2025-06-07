import { IsString, IsNotEmpty, IsEmail, IsInt, Min, IsDateString } from 'class-validator';

export class BookTourDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsInt()
  @Min(1)
  numberOfGuests: number;

  @IsDateString()
  @IsNotEmpty()
  tourDate: string; // ISO format: yyyy-mm-dd

  @IsString()
  @IsNotEmpty()
  tourId: string; // ID của tour cần đặt
}
