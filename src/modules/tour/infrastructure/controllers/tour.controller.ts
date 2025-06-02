import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTourDto } from '../dto/create-tour.dto';
import { UpdateTourDto } from '../dto/update-tour.dto';
import { JwtAuthGuard } from '@/modules/auth/infrastructure/guards/jwt-auth.guard';
import { CreateTourUseCase } from '../../application/use-cases/create-tour.use-case';
import { UpdateTourUseCase } from '../../application/use-cases/update-tour.use-case';
import { DeleteTourUseCase } from '../../application/use-cases/delete-tour.use-case';
import { Roles } from '@/modules/auth/infrastructure/decorators/roles.decorator';
import { UserRole } from '@/modules/auth/domain/user-role.enum';
import { ListToursUseCase } from '../../application/use-cases/list-tours.use-case';
import { GetTourDetailUseCase } from '../../application/use-cases/get-tour-detail.use-case';
import { ListToursQueryDto } from '../dto/list-tours-query.dto';
import { TourDetailDto } from '../dto/tour-detail.dto';
import { RolesGuard } from '@/modules/auth/infrastructure/guards/roles.guard';
import { AuthRolesGuard } from '@/modules/auth/infrastructure/guards/auth-roles.guard';

@Controller('tours')
export class TourController {
  constructor(
    private readonly listToursUC: ListToursUseCase,
    private readonly getTourDetailUC: GetTourDetailUseCase,
    private readonly createTourUC: CreateTourUseCase,
    private readonly updateTourUC: UpdateTourUseCase,
    private readonly deleteTourUC: DeleteTourUseCase,
  ) {}

  @Get()
  async listTours(@Query() query: ListToursQueryDto) {
    return this.listToursUC.execute(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.CREATED)
  async getTour(@Param('id') id: string): Promise<TourDetailDto> {
    return this.getTourDetailUC.execute(id);
  }

  @Post()
  @UseGuards(AuthRolesGuard)
  @Roles(UserRole.Admin)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTourDto) {
    const tour = await this.createTourUC.execute(dto);
    return {
      status: 'success',
      message: 'Tour created successfully',
      data: tour,
    };
  }

  @Put(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRole.Admin)
  async update(@Param('id') id: string, @Body() dto: UpdateTourDto) {
    await this.updateTourUC.execute(id, dto);
    return { message: 'Tour updated successfully' };
  }

  @Delete(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRole.Admin)
  async delete(@Param('id') id: string) {
    await this.deleteTourUC.execute(id);
    return { message: 'Tour deleted successfully' };
  }
}

