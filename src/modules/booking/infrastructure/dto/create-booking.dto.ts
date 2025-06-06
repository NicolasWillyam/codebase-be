import { IsEmail, IsNotEmpty, IsInt, Min, IsDateString, IsPhoneNumber } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phone: string;

  @IsNotEmpty()
  tourId: string;

  @IsInt()
  @Min(1)
  numberOfGuests: number;

  @IsDateString()
  @IsNotEmpty()
  departureDate: string;

  type: 'tour' | 'homestay';
}
