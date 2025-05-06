// backend/src/modules/campaign/campaign.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './domain/campaign.entity';

import { CampaignRepository } from './application/ports/campaign.repository';
import { CampaignController } from './infrastructure/controllers/campaign.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  providers: [CampaignRepository],
  controllers: [CampaignController],
})
export class CampaignModule {}
