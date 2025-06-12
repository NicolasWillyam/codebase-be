import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CreateHomestayDto } from '../../domain/dto/create-homestay.dto';
import { UpdateHomestayDto } from '../../domain/dto/update-homestay.dto';
import { CreateHomestayUseCase } from '../../application/use-cases/create-homestay.use-case';
import { GetHomestayListUseCase } from '../../application/use-cases/get-homestay-list.use-case';
import { UpdateHomestayUseCase } from '../../application/use-cases/update-homestay.use-case';
import { DeleteHomestayUseCase } from '../../application/use-cases/delete-homestay.use-case';
import { HomestaySearchQueryDto } from '../../domain/dto/homestay-search-query.dto';
import { GetHomestayDetailUseCase } from '@/modules/booking/application/use-cases/get-homestay-detail.use-case';
import { SearchHomestaysUseCase } from '../../application/use-cases/search-homestay.use-case';
import { SearchHomestayDto } from '../../domain/dto/search-homestay.dto';

@Controller('homestays')
export class HomestayController {
  constructor(
    private readonly createHomestay: CreateHomestayUseCase,
    private readonly getList: GetHomestayListUseCase,
    private readonly getDetail: GetHomestayDetailUseCase,
    private readonly updateHomestay: UpdateHomestayUseCase,
    private readonly deleteHomestay: DeleteHomestayUseCase,
    private readonly searchRooms: SearchHomestaysUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateHomestayDto) {
    const data = await this.createHomestay.execute(dto);
    return {
      status: 'success',
      message: 'Homestay created successfully',
      data,
    };
  }

  @Get()
  async findAll(@Query() query: HomestaySearchQueryDto) {
    const data = await this.getList.execute(query);
    return {
      status: 'success',
      message: 'Homestays retrieved successfully',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.getDetail.execute(id);
    return {
      status: 'success',
      message: 'Homestay retrieved successfully',
      data,
    };
  }

  @Post('search')
  async search(@Body() body: SearchHomestayDto) {
    const data = await this.searchRooms.execute({
      city: body.city,
      country: body.country,
      checkIn: body.checkIn ? new Date(body.checkIn) : undefined,
      checkOut: body.checkOut ? new Date(body.checkOut) : undefined,
      minPrice: body.minPrice,
      maxPrice: body.maxPrice,
      guests: body.guests,
    });
    return {
      status: 'success',
      message: 'Homestay searched successfully',
      data,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateHomestayDto,
  ) {
    const data = await this.updateHomestay.execute(id, dto);
    return {
      status: 'success',
      message: 'Homestay updated successfully',
      data,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.deleteHomestay.execute(id);
    return {
      status: 'success',
      message: 'Homestay deleted successfully',
      data,
    };
  }
}
