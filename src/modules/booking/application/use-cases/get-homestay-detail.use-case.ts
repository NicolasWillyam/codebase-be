// src/modules/booking/application/use-cases/get-homestay-detail.use-case.ts
import { HomestayRepository } from '@/modules/homestay/application/ports/homestay.repository';
import { Injectable, Inject } from '@nestjs/common'; // Import Inject

@Injectable()
export class GetHomestayDetailUseCase {
  constructor(
    @Inject('HomestayRepository') // <--- ADD THIS DECORATOR
    private readonly homestayRepository: HomestayRepository,
  ) {}

  async execute(homestayId: string): Promise<any | undefined> {
    // Changed to any for now, adjust to HomestayEntity if correct
    if (!this.homestayRepository) {
      console.error('HomestayRepository is undefined!');
      throw new Error('Homestay repository not initialized.');
    }
    // Assuming HomestayRepository has a findById method
    return this.homestayRepository.findById(homestayId);
  }
}
