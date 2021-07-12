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

   

    @Post()
    createusersdata(
        @Body('userid') userid: any,  @Body('fcmtoken') fcmtoken: any): Promise<any> {
        return this.usersdataService.createusersdata(userid,fcmtoken);
    }
    @Post('/getusersdata')
    getdataofusers(
        @Body('userid') userid: any): Promise<any> {
        return this.usersdataService.getdataofusers(userid);
    }
  

}
