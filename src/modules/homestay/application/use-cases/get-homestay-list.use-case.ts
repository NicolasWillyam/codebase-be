import { Injectable, Inject } from '@nestjs/common';
import { HomestayRepository } from '../ports/homestay.repository';
import { HomestayEntity } from '../../domain/homestay.entity';
import { HomestaySearchQueryDto } from '../../domain/dto/homestay-search-query.dto';

@Injectable()
export class GetHomestayListUseCase {
  constructor(
    @Inject('HomestayRepository')
    private readonly homestayRepo: HomestayRepository,
  ) {}

  async execute(query: HomestaySearchQueryDto): Promise<HomestayEntity[]> {
    return this.homestayRepo.findAll(query);
  }
}
