import {
  IsEmail,
  IsNotEmpty,
  IsInt,
  Min,
  IsDateString,
  IsOptional,
  IsUUID,
  IsIn,
} from 'class-validator';

export class CreateHomestayBookingDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsUUID()
  homestayId: string;

  @IsDateString()
  checkInDate: string;

  @IsDateString()
  checkOutDate: string;

  @IsInt()
  @Min(1)
  numberOfGuests: number;

  @IsOptional()
  note?: string;

  @IsIn(['homestay']) // Nếu bạn chỉ dùng type này
  @IsOptional()
  type?: 'homestay';
}
