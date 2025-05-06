// backend/src/modules/campaign/infrastructure/controllers/campaign.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';

import { Campaign } from '../../domain/campaign.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CampaignRepository } from '../../application/ports/campaign.repository';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@ApiTags('Campaigns')
@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách chiến dịch' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách campaign',
    type: [Campaign],
  })
  async findAll(): Promise<Campaign[]> {
    return this.campaignRepository.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới chiến dịch' })
  @ApiResponse({ status: 201, description: 'Campaign đã tạo', type: Campaign })
  async create(@Body() dto: CreateCampaignDto): Promise<Campaign> {
    return this.campaignRepository.create(dto);
  }
}
