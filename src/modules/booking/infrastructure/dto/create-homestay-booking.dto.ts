import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsUUID,
  IsDateString,
  Min,
  IsInt,
} from 'class-validator';

export class CreateHomestayBookingDto {
  @IsUUID()
  homestayId: string;

  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('VN')
  phone: string;

  @IsDateString()
  checkInDate: string;

  @IsDateString()
  checkOutDate: string;

  @IsInt()
  @Min(1)
  numberOfGuests: number;
}
