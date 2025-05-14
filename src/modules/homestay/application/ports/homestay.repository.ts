import { HomestayEntity } from '../../domain/homestay.entity';
import { HomestaySearchQueryDto } from '../../infrastructure/dto/homestay-search-query.dto';

export interface HomestayRepository {
  getHomestays(query: HomestaySearchQueryDto): Promise<HomestayEntity[]>;
}
