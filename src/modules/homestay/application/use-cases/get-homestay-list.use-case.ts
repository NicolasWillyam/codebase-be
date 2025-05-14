import { Inject, Injectable } from '@nestjs/common';
import { HomestayRepository } from '../ports/homestay.repository';
import { HomestaySearchQueryDto } from '../../infrastructure/dto/homestay-search-query.dto';
import { HomestayEntity } from '../../domain/homestay.entity';

@Injectable()
export class GetHomestayListUseCase {
  constructor(
    @Inject('HomestayRepository')
    private readonly homestayRepo: HomestayRepository,
  ) {}

  async execute(query: HomestaySearchQueryDto): Promise<HomestayEntity[]> {
    return this.homestayRepo.getHomestays(query);
  }
}
