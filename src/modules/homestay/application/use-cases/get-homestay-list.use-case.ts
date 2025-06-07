import { Inject, Injectable } from '@nestjs/common';
import { HomestayRepository } from '../ports/homestay.repository';
import { HomestaySearchQueryDto } from '../../infrastructure/dto/homestay-search-query.dto';
import { HomestayListItemDto } from '../../infrastructure/dto/homestay-list-item.dto';

@Injectable()
export class GetHomestayListUseCase {
  constructor(
    @Inject('HomestayRepository')
    private readonly homestayRepo: HomestayRepository,
  ) {}

  async execute(query: HomestaySearchQueryDto): Promise<HomestayListItemDto[]> {
    const entities=await this.homestayRepo.getHomestays(query);
    return entities.map(HomestayListItemDto.fromEntity);
  }
}
