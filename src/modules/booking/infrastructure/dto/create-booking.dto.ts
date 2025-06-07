import { IsString, IsEmail, IsPhoneNumber, IsEnum, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsEnum(['tour', 'homestay'])
  type: 'tour' | 'homestay';

  @IsString()
  @IsOptional()
  tourId?: string;

  @IsString()
  @IsOptional()
  homestayId?: string;

  @IsDate()
  @IsOptional()
  checkInDate?: Date;

  @IsDate()
  @IsOptional()
  checkOutDate?: Date;

  @IsNumber()
  numberOfGuests: number;
}
