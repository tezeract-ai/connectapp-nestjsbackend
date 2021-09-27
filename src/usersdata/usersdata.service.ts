import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usersdata } from './usersdata.model'






@Injectable()
export class UsersdataService {
    constructor(@InjectModel('Usersdata') private readonly usersdataModel: Model<any>) { }


    async createusersdata(userid: any,userdata:any,userlocation): Promise<any> {
        console.log('userid', userid,userdata,userlocation)
       
        const createdataofusers=await this.usersdataModel.findOneAndUpdate({userid:userid}, {userid:userid ,userdata:userdata,userlocation:userlocation}, { new: true,upsert: true,returnNewDocument:true });
        console.log("createdataofusers",createdataofusers)
        return await createdataofusers.save()
    }
   


  
    
}