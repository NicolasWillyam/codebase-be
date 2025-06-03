import { IsNotEmpty, IsString, IsNumber, IsEmail, IsDate, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ description: 'Tour ID' })
  @IsNotEmpty()
  @IsString()
  tourId: string;

  @ApiProperty({ description: 'Number of adults' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  numberOfAdults: number;

  @ApiProperty({ description: 'Number of children', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  numberOfChildren?: number;

  @ApiProperty({ description: 'Customer name' })
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @ApiProperty({ description: 'Customer email' })
  @IsNotEmpty()
  @IsEmail()
  customerEmail: string;

  @ApiProperty({ description: 'Customer phone' })
  @IsNotEmpty()
  @IsString()
  customerPhone: string;

  @ApiProperty({ description: 'Start date of the tour' })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @ApiProperty({ description: 'Special requests', required: false })
  @IsOptional()
  @IsString()
  specialRequests?: string;
}
