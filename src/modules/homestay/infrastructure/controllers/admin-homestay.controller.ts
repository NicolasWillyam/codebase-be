import { GetHomestayListAdminUseCase } from "../../application/use-cases/get-homestay-list-admin.use-case";
import { HomestaySearchQueryDto } from "../dto/homestay-search-query.dto";
import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';

@Controller('admin/homestays')
export class AdminHomestayController{
    constructor(private readonly getAdminListUC :GetHomestayListAdminUseCase){}

    @Get()
    async getAll(@Query() query :HomestaySearchQueryDto){
        const data =await this.getAdminListUC.execute(query);
        return {
            status : 'success',
            message : 'Danh sách homestay (admin)',
            data,
        };
    }
}