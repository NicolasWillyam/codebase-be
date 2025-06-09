import { HomestayRepository } from '@/modules/homestay/application/ports/homestay.repository';

export class GetHomestayDetailUseCase {
  constructor(private readonly repo: HomestayRepository) {}

  execute(id: string) {
    return this.repo.findById(id);
  }
}
