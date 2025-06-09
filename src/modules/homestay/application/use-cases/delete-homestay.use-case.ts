import { HomestayRepository } from '../ports/homestay.repository';

export class DeleteHomestayUseCase {
  constructor(private readonly repo: HomestayRepository) {}

  async execute(id: string) {
    return this.repo.delete(id);
  }
}
