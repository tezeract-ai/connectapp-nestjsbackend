import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Usersdata } from './usersdata.model'

@Injectable()
export class UsersdataService {
  constructor(
    @InjectModel('Usersdata') private readonly usersdataModel: Model<any>
  ) {}

  async storingtoken(userid: any, userdata: any, expotoken: any): Promise<any> {
    // console.log('expotoken', userid,userdata,expotoken)
    const createdataofusers = await this.usersdataModel.findOneAndUpdate(
      { userid: userid },
      {
        userid: userid,
        userdata: userdata,
        expotoken: expotoken,
        location: { type: 'Point', coordinates: [0, 0] },
      },
      { new: true, upsert: true, returnNewDocument: true }
    )
    // console.log("createdataofusers",createdataofusers)
    return await createdataofusers.save()
  }

  async filteredusersdata(
    searchquery: any,
    userlocation: any,
    userid: any
  ): Promise<any> {
    console.log('userid', searchquery, userlocation, userid, searchquery.length)
    if (searchquery.length > 0) {
      const filterbydistance = await this.usersdataModel.find({
        $and: [
          {
            location: {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: userlocation,
                },
                $maxDistance: 5,
              },
            },
          },
          { 'userdata.email': { $regex: searchquery } },
          { userid: { $ne: userid } },
        ],
      })
      //  console.log('filterbydistancefilterbydistance',filterbydistance)

      // console.log('filteredusers',filterbydistance)
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
      const c = filterbydistance[0].connection

      console.log('filterbydistancefilterbydistance', filterbydistance, c)
      if (c.includes(userid)) {
        console.log('user pehle se connected hai ')
        return []
      }

      return filterbydistance
    } else {
      return []
    }
  }

  async createusersdata(userid: any, userdata: any, location): Promise<any> {
    // console.log('userid', userid,userdata,location)
    const createdataofusers = await this.usersdataModel.findOneAndUpdate(
      { userid: userid },
      {
        userid: userid,
        userdata: userdata,
        location: { type: 'Point', coordinates: location },
      },
      { new: true, upsert: true, returnNewDocument: true }
    )
    // console.log("createdataofusers",createdataofusers)
    return await createdataofusers.save()
  }

  async acceptingconnection(userid: any, connectionid: any): Promise<any> {
    // console.log('acceptingconnection', userid,connectionid)
    const connectionaccept1 = await this.usersdataModel
      .findOneAndUpdate(
        { userid: userid },
        {
          $push: {
            connection: {
              $each: [connectionid],
              $position: 0,
            },
          },
        },
        { new: true, upsert: true }
      )
      .exec()

    const connectionaccept2 = await this.usersdataModel
      .findOneAndUpdate(
        { userid: connectionid },
        {
          $push: {
            connection: {
              $each: [userid],
              $position: 0,
            },
          },
        },
        { new: true, upsert: true }
      )
      .exec()

    return 'You both are a connection now '
  }
}
