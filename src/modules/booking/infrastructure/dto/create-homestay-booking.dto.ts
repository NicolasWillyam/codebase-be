import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsUUID,
  IsDateString,
  Min,
  IsInt,
  Validate,
  ValidationArguments,
} from 'class-validator';
import { IsAfterDate } from '../validators/is-after-date.validator';

export class CreateHomestayBookingDto {
  @IsUUID()
  @IsNotEmpty()
  homestayId: string;

  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('VN')
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  checkInDate: string;

  @IsDateString()
  @IsNotEmpty()
  @Validate(IsAfterDate, ['checkInDate'])
  checkOutDate: string;

  @IsInt()
  @Min(1)
  numberOfGuests: number;
}
