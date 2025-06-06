import { HomestayAdminListItemDto } from "../../infrastructure/dto/homestay-admin-list-item.dto";
import { HomestaySearchQueryDto } from "../../infrastructure/dto/homestay-search-query.dto";
import { HomestayRepository } from "../ports/homestay.repository";
import { Injectable, Inject } from '@nestjs/common';
import { GetHomestayListAdminUseCase } from './application/use-cases/get-homestay-list-admin.use-case';


@Injectable()
export class GetHomestayListAdminUseCase{
    constructor(
        @Inject('HomestayRepository')
        private readonly homestayRepo: HomestayRepository,
    ){}

    async execute(query: HomestaySearchQueryDto):Promise<HomestayAdminListItemDto[]>{
        const entities =await this.homestayRepo.getHomestays(query);
        return entities.map(HomestayAdminListItemDto.fromEntity);
    }
}