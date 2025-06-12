// src/modules/homestay/application/use-cases/update-homestay.use-case.ts
import { Injectable, Inject } from '@nestjs/common'; // Make sure Inject is imported
import { HomestayRepository } from '../../application/ports/homestay.repository'; // Adjust path if needed
import { UpdateHomestayDto } from '../../domain/dto/update-homestay.dto'; // Assuming you have this DTO

@Injectable()
export class UpdateHomestayUseCase {
  constructor(
    @Inject('HomestayRepository') // <--- ADD THIS DECORATOR
    private readonly homestayRepository: HomestayRepository,
  ) {}

  async execute(id: string, dto: UpdateHomestayDto): Promise<any> {
    // Adjust return type as needed
    // Line 8: Make sure homestayRepository is defined before calling update
    if (!this.homestayRepository) {
      console.error(
        'HomestayRepository is undefined in UpdateHomestayUseCase!',
      );
      throw new Error(
        'Homestay repository not initialized in update use case.',
      );
    }
    // Assuming your HomestayRepository has an 'update' method that takes an ID and DTO
    return this.homestayRepository.update(id, dto);
  }
}
