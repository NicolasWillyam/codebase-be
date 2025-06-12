import { HomestayRepository } from '@/modules/homestay/application/ports/homestay.repository';
import { HomestayEntity } from '@/modules/homestay/domain/homestay.entity';
import { Inject } from '@nestjs/common';

export class GetHomestayDetailUseCase {
  constructor(
    @Inject('HomestayRepository')
    private readonly homestayRepository: HomestayRepository, // <-- Make sure this is correctly injected
  ) {}
  async execute(homestayId: string): Promise<HomestayEntity | undefined> {
    // Check if homestayRepository is defined before calling findById
    if (!this.homestayRepository) {
      console.error('HomestayRepository is undefined!');
      // Handle the error appropriately, e.g., throw a custom exception
      throw new Error('Homestay repository not initialized.');
    }
    return this.homestayRepository.findById(homestayId); // This is line 7
  }
}
