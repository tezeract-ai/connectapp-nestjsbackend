import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usersdata } from './usersdata.model'






@Injectable()
export class UsersdataService {
    constructor(@InjectModel('Usersdata') private readonly usersdataModel: Model<any>) { }

    async filteredusersdata(searchquery: any,userlocation:any,userid:any): Promise<any> {
        console.log('userid', searchquery,userlocation,userid)
        const filterbydistance=await this.usersdataModel.find(
            {$and:[
                {
                location: {
                  $near: {
                    $geometry: {
                       type: "Point" ,
                       coordinates: userlocation
                    },
                    $maxDistance: 5000,
                  }
                },
             } , 
             {"userdata.email" : {$regex :searchquery }}     ,
             { userid: { $ne: userid } } 
              ]}

               )
               console.log('filterbydistancefilterbydistance',filterbydistance)

    console.log('filteredusers',filterbydistance)
    // const filterbydistance = await Promise.all(filteredusers.map(async (filt) => {
    //  this.usersdataModel.find(
    //     {
    //         location: {
    //           $near: {
    //             $geometry: {
    //                type: "Point" ,
    //                coordinates: [ filt?.location?.coordinates[0],filt?.location?.coordinates[1]]
    //             },
    //             $maxDistance: 5000,
    //           }
    //         }
    //      }  
         
    //        )
    //        console.log('locationnnn',filt?.location?.coordinates[1])
    //        }))  
    //        console.log('filterbydistancefilterbydistance',filterbydistance)
 
           return filterbydistance
        }


    async createusersdata(userid: any,userdata:any,location): Promise<any> {
        console.log('userid', userid,userdata,location)
        const createdataofusers=await this.usersdataModel.findOneAndUpdate({userid:userid}, {userid:userid ,userdata:userdata,location:{type:'Point',coordinates:location}}, { new: true,upsert: true,returnNewDocument:true });
        console.log("createdataofusers",createdataofusers)
        return await createdataofusers.save()
    }
   


  
    
}