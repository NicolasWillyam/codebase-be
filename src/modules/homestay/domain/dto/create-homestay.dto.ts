import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class RoomInfo {
  @IsNumber() guestCount: number;
  @IsNumber() bedroomCount: number;
  @IsNumber() bedCount: number;
  @IsNumber() bathroomCount: number;
  @IsNumber() floor: number;
  @IsBoolean() hasKitchen: boolean;
  @IsBoolean() hasLivingRoom: boolean;
}

class AmenityItem {
  @IsString() icon: string;
  @IsString() label: string;
  @IsOptional() @IsString() category?: string;
}

export class CreateHomestayDto {
  @IsString() name: string;
  @IsString() description: string;
  @IsString() address: string;
  @IsString() city: string;
  @IsString() country: string;
  @IsNumber() latitude: number;
  @IsNumber() longitude: number;
  @IsArray() @IsString({ each: true }) images: string[];

  @ValidateNested() @Type(() => RoomInfo) rooms: RoomInfo;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AmenityItem)
  amenities: AmenityItem[];

  @IsNumber() pricePerNight: number;
  @IsOptional() @IsBoolean() isFavorite?: boolean;
}
