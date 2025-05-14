import { Controller, Get, Query } from '@nestjs/common';
import { GetHomestayListUseCase } from '../../application/use-cases/get-homestay-list.use-case';
import { HomestaySearchQueryDto } from '../dto/homestay-search-query.dto';

@Controller('homestays')
export class HomestayController {
  constructor(private readonly getHomestayListUC: GetHomestayListUseCase) {}

  @Get()
  async getHomestays(@Query() query: HomestaySearchQueryDto) {
    const data = await this.getHomestayListUC.execute(query);
    return {
      status: 'success',
      message: 'Danh sách homestay',
      data,
    };
  }
}
