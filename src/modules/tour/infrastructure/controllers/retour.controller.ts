// Swagger decorators	Tự động tạo tài liệu API với mô tả, tham số, kiểu dữ liệu, response
// ResponseDto	Chuẩn hóa tất cả phản hồi trả về từ controller
// AuthRolesGuard	Kiểm tra cả xác thực (JWT) và phân quyền (role-based)
// @Roles()	Decorator chỉ định vai trò được phép gọi API
// @ApiBearerAuth()	Swagger nhận biết cần JWT Token
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { CreateTourDto } from '../dto/create-tour.dto';
import { UpdateTourDto } from '../dto/update-tour.dto';
import { ListToursQueryDto } from '../dto/list-tours-query.dto';
import { TourDetailDto } from '../dto/tour-detail.dto';
import { ResponseDto } from '@/common/dto/response.dto';

import { CreateTourUseCase } from '../../application/use-cases/create-tour.use-case';
import { UpdateTourUseCase } from '../../application/use-cases/update-tour.use-case';
import { DeleteTourUseCase } from '../../application/use-cases/delete-tour.use-case';
import { ListToursUseCase } from '../../application/use-cases/list-tours.use-case';
import { GetTourDetailUseCase } from '../../application/use-cases/get-tour-detail.use-case';

import { Roles } from '@/modules/auth/infrastructure/decorators/roles.decorator';
import { UserRole } from '@/modules/auth/domain/user-role.enum';
import { AuthRolesGuard } from '@/modules/auth/infrastructure/guards/auth-roles.guard';

// Gắn thẻ nhóm controller trong Swagger UI
@ApiTags('Tours')
@Controller('tours')
export class TourController {
  // Inject các UseCase theo Clean Architecture
  constructor(
    private readonly listToursUC: ListToursUseCase,
    private readonly getTourDetailUC: GetTourDetailUseCase,
    private readonly createTourUC: CreateTourUseCase,
    private readonly updateTourUC: UpdateTourUseCase,
    private readonly deleteTourUC: DeleteTourUseCase,
  ) {}

  /**
   * [GET] /tours
   * Lấy danh sách tour theo điều kiện lọc.
   */
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách các tour' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách các tour' })
  async listTours(@Query() query: ListToursQueryDto) {
    const tours = await this.listToursUC.execute(query);
    return new ResponseDto('Lấy danh sách tour thành công', tours);
  }

  /**
   * [GET] /tours/:id
   * Lấy chi tiết tour theo ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết tour theo ID' })
  @ApiResponse({ status: 200, type: TourDetailDto })
  async getTourDetail(@Param('id') id: string) {
    const tour = await this.getTourDetailUC.execute(id);
    return new ResponseDto('Lấy chi tiết tour thành công', tour);
  }

  /**
   * [POST] /tours
   * Tạo tour mới.
   * Chỉ cho phép Admin.
   */
  @Post()
  @UseGuards(AuthRolesGuard) // Kiểm tra xác thực và quyền truy cập
  @Roles(UserRole.Admin)     // Chỉ Admin mới được tạo tour
  @ApiBearerAuth()           // Swagger: yêu cầu JWT
  @ApiOperation({ summary: 'Tạo tour mới (Admin)' })
  @ApiResponse({ status: 201, description: 'Tour được tạo thành công' })
  @HttpCode(HttpStatus.CREATED)
  async createTour(@Body() dto: CreateTourDto) {
    const tour = await this.createTourUC.execute(dto);
    return new ResponseDto('Tạo tour thành công', tour);
  }

  /**
   * [PUT] /tours/:id
   * Cập nhật thông tin tour.
   * Chỉ cho phép Admin.
   */
  @Put(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRole.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật tour theo ID (Admin)' })
  @ApiResponse({ status: 200, description: 'Tour được cập nhật thành công' })
  async updateTour(@Param('id') id: string, @Body() dto: UpdateTourDto) {
    await this.updateTourUC.execute(id, dto);
    return new ResponseDto('Cập nhật tour thành công');
  }

  /**
   * [DELETE] /tours/:id
   * Xóa tour theo ID.
   * Chỉ cho phép Admin.
   */
  @Delete(':id')
  @UseGuards(AuthRolesGuard)
  @Roles(UserRole.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa tour theo ID (Admin)' })
  @ApiResponse({ status: 200, description: 'Tour được xóa thành công' })
  async deleteTour(@Param('id') id: string) {
    await this.deleteTourUC.execute(id);
    return new ResponseDto('Xóa tour thành công');
  }
}
