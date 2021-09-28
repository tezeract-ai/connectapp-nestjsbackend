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
import { UsersdataService } from './usersdata.service'
import { Request,Response } from 'express';

@Controller('usersdata')
export class UsersdataController {
    constructor(private readonly usersdataService: UsersdataService) { }

    @Post('/getFilteredUsers')
    filteredusersdata(
        @Body('searchquery') searchquery: any,@Body('userlocation') userlocation:any,@Body('userid') userid:any): Promise<any> {
        return this.usersdataService.filteredusersdata(searchquery,userlocation,userid);
    }

    @Post('/sendUserLocation')
    createusersdata(
        @Body('userid') userid: any,  @Body('userdata') userdata: any,@Body('location') location: any): Promise<any> {
        return this.usersdataService.createusersdata(userid,userdata,location);
    }
   
    
}
