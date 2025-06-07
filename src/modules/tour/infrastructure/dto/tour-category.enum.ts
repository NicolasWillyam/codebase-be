export enum TourCategory {
  DOMESTIC = 'domestic',
  INTERNATIONAL = 'international',
  ADVENTURE = 'adventure',
  RELAX = 'relax',
}
import { IsOptional, IsEnum } from 'class-validator';
import { TourCategory } from './tour-category.enum';

export class FilterTourDto {
  @IsOptional()
  @IsEnum(TourCategory)
  category?: TourCategory;
}
