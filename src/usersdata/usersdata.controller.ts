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

   

    @Post('/sendUserLocation')
    createusersdata(
        @Body('userid') userid: any,  @Body('userdata') userdata: any,@Body('userlocation') userlocation: any): Promise<any> {
        return this.usersdataService.createusersdata(userid,userdata,userlocation);
    }
   
    
}
