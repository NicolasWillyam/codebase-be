import { BookTourDto } from '../dto/book-tour.dto';
import { BookTourUseCase } from '../../application/use-cases/book-tour.use-case';

@Controller('tours')
export class TourController {
  constructor(
    private readonly listToursUC: ListToursUseCase,
    private readonly getTourDetailUC: GetTourDetailUseCase,
    private readonly createTourUC: CreateTourUseCase,
    private readonly updateTourUC: UpdateTourUseCase,
    private readonly deleteTourUC: DeleteTourUseCase,
    private readonly bookTourUC: BookTourUseCase, // 👈 Inject thêm Use Case này
  ) {}

  // ... các method khác

  /**
   * Đặt tour
   * @param dto Thông tin đặt tour (tourId, ngày đi, số lượng người, ...)
   * @returns Thông báo kết quả đặt tour
   */
  @Post(':id/book')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async bookTour(@Param('id') tourId: string, @Body() dto: BookTourDto) {
    const result = await this.bookTourUC.execute({ ...dto, tourId });
    return {
      status: 'success',
      message: 'Đặt tour thành công',
      data: result,
    };
  }
}
