import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usersdata } from './usersdata.model'



@Injectable()
export class UsersdataService {
    constructor(@InjectModel('Usersdata') private readonly usersdataModel: Model<any>) { }


    async createusersdata(userid: any,fcmtoken:any): Promise<any> {
        console.log('userid', userid,fcmtoken)
        // let checknode = await this.nodeModel.find({ nodeid: node.nodeid })
        // console.log('checknode', checknode)
        const checkuser = await this.usersdataModel.findOne({ userid:userid })
        console.log('checkuser', checkuser)
        if (checkuser) {
          return { message: 'User Already exists' }
        } else {
          const newuser = new this.usersdataModel({userid:userid,fcmtoken:fcmtoken});
          console.log('newuser', newuser)
          return await newuser.save();
        }
    }
   


    async getdataofusers(userid: any): Promise<any> {

console.log('userid22',userid)

const getdataofuser = await this.usersdataModel.findOne({ userid:userid })
return getdataofuser

}
    
}