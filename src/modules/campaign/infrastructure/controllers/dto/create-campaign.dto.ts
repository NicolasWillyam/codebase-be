// backend/src/modules/campaign/infrastructure/controllers/dto/create-campaign.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDto {
  @ApiProperty({ example: 'Chiến dịch 1' })
  name: string;

  @ApiProperty({ example: 'draft', enum: ['draft', 'active', 'archived'] })
  status: string;
}
