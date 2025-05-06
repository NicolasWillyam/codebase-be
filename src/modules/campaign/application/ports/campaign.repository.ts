// backend/src/modules/campaign/infrastructure/repositories/campaign.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Campaign } from '../../domain/campaign.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CampaignRepository {
  constructor(
    @InjectRepository(Campaign)
    private readonly repo: Repository<Campaign>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(data: Partial<Campaign>) {
    const campaign = this.repo.create(data);
    return this.repo.save(campaign);
  }
}
