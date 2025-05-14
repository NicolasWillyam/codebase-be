import { IsEmail, IsNotEmpty, IsInt, Min, IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  tourId: string;

  @IsInt()
  @Min(1)
  numberOfGuests: number;

  @IsDateString()
  departureDate: string;

  type: 'tour' | 'homestay';
}
