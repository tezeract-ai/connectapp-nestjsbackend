import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Req,
    Param,
    Res,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service'
import { Request,Response } from 'express';

@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get()
    findAll(): Promise<any> {
        return this.analyticsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<any> {
        return this.analyticsService.findOne(id);
    }

    @Post()
    filteredAnalysis(
        @Body('user_id') user_id: any): Promise<any> {
        return this.analyticsService.filteredAnalysis(user_id);
    }
    @Post('/sharedanalysis')
    sharedAnalysis(
        @Body('user_id') user_id: any, @Body('videouri') videouri: any, @Body('kicktype') kicktype: any, @Body('token') token: any): Promise<any> {
        return this.analyticsService.sharedAnalysis(user_id,videouri,kicktype,token);
    }
    @Post('/creation')
    creates(
        @Req() request: Request): Promise<any> {
        return this.analyticsService.creates(request.body);
    }
    @Post('/createtoken')
    createtoken(
        @Body('token') token: any, @Body('body') body: any, @Body('title') title: any,@Res() response:Response): Promise<any> {
        return this.analyticsService.createtoken(token,body,title,response);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<any> {
        return this.analyticsService.delete(id);
    }

    @Put(':id')
    update(@Body('id') id, @Body('shared_to') shared_to: string[],@Body('connectioninfo') connectioninfo: string[]): Promise<any> {
        return this.analyticsService.update(id, shared_to,connectioninfo);
    }
    @Put('update/:id')
    updatename(@Param('id') id, @Body('fileName') fileName: string): Promise<any> {
        return this.analyticsService.updatename(id, fileName);
    }
    @Put('updatefolderid/:id')
    updatefolderid(@Param('id') id, @Body('folderId') folderId: string): Promise<any> {
        return this.analyticsService.updatefolderid(id, folderId);
    }
}


