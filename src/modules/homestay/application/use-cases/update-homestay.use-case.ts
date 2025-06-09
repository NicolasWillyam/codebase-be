import { UpdateHomestayDto } from '../../domain/dto/update-homestay.dto';
import { HomestayRepository } from '../ports/homestay.repository';

export class UpdateHomestayUseCase {
  constructor(private readonly repo: HomestayRepository) {}

  async execute(id: string, dto: UpdateHomestayDto) {
    return this.repo.update(id, dto);
  }
}
