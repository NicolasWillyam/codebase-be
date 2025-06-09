import { Inject, Injectable } from '@nestjs/common';
import { HomestayRepository } from '../ports/homestay.repository';
import { CreateHomestayDto } from '../../domain/dto/create-homestay.dto';

@Injectable()
export class CreateHomestayUseCase {
  constructor(
    @Inject('HomestayRepository')
    private readonly homestayRepository: HomestayRepository,
  ) {}

  async execute(dto: CreateHomestayDto) {
    return this.homestayRepository.create(dto);
  }
}
