import { Inject } from '@nestjs/common';
import { HomestayRepository } from '../ports/homestay.repository';

export class DeleteHomestayUseCase {
  constructor(
    @Inject('HomestayRepository') // <--- ADD THIS DECORATOR
    private readonly homestayRepository: HomestayRepository,
  ) {}

  async execute(id: string): Promise<any> {
    // Adjust return type as needed (e.g., DeleteResult from TypeORM)
    // Line 7: Make sure homestayRepository is defined before calling delete
    if (!this.homestayRepository) {
      console.error(
        'HomestayRepository is undefined in DeleteHomestayUseCase!',
      );
      throw new Error(
        'Homestay repository not initialized in delete use case.',
      );
    }
    // Assuming your HomestayRepository has a 'delete' method that takes an ID
    return this.homestayRepository.delete(id);
  }
}
