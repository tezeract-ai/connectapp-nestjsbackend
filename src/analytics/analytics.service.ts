import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Analytics } from './analytics.model'
import * as admin from "firebase-admin";
import fetch from 'node-fetch'
const serviceAccount = require("../../player-cloud-tech-firebase-adminsdk-73bm5-a080777234.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://player-cloud-tech.firebaseio.com",
  });

@Injectable()
export class AnalyticsService {
    constructor(@InjectModel('Analytics') private readonly analyticsModel: Model<any>) { }

    async findAll(): Promise<any> {
        return await this.analyticsModel.find();
    }

    async findOne(id: string): Promise<any> {
        return await this.analyticsModel.findOne({ _id: id });
    }

    async filteredAnalysis(user_id: any): Promise<any> {
        console.log('user_id', user_id)
        const findbyuserid = await this.analyticsModel.find( { $or: [ { shared_to:user_id} , { user_id: user_id } ] } );



    console.log('findbyuserid', findbyuserid)
    return findbyuserid


    }
    async createtoken(token: any,body: any,title: any,res:any): Promise<any> {

        // const notification_options = {
        //     priority: "high",
        //     timeToLive: 60 * 60 * 24
        //     };

        // let payload = {
        //   notification: {
        //     title: "Lynx Parent App",
        //     body: "Your Child reached school",
        //     sound: "default",
        //     vibration: "default",
        //   },
        // };
        // let options = {};
        // try {
        //   let sendNotification = await admin
        //     .messaging()
        //     .sendToDevice("token", payload, options);
        //   console.log(sendNotification);
        // } catch (error) {
        //   console.log(error);
        // }

        const notification_options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
            };
     
            const payload = {
            notification: {
            title: title,
            body: body
             }
            };
           admin.messaging().sendToDevice(token, payload, notification_options)
           .then( response => {
               //configure your response here
               
               res.status(200).send("Notification sent successfully")
               console.log('response',response)
            
           })
           .catch( error => {
               console.log(error);
           });
        
      }


    async sendAnalysis(user_id: any,videouri:any,kicktype:string,token:any): Promise<any> {
        var formData = new FormData();
        console.log('sharedanalysis',user_id,videouri)
        const newAnalyis =await new this.analyticsModel({user_id:user_id,kicktype:kicktype,videouri:videouri});
        let useranalysis=await newAnalyis.save()
        const findUserIdinAnalysis= await this.analyticsModel.find({user_id:user_id})
        const initial=findUserIdinAnalysis?'False':'True'
        console.log('initial',initial)
        console.log('useranalysis',useranalysis)

        formData.append('video',videouri)
        formData.append('video_p01_start_time','0')
        formData.append('video_p02_start_time','21')
        formData.append('video_p03_start_time','1')
        formData.append('user_id',useranalysis.user_id)
        formData.append('height','170')
        formData.append('gender','male')
        formData.append('initial',initial)
        formData.append('datetime',useranalysis.createdAt)
        formData.append('token',token)


fetch('http://139.59.34.247:5000/api/video_processing', { method: 'POST',  body: formData
    // video: videouri,
    // video_p01_start_time: 0,
    // video_p02_start_time: 21,
    // video_p03_start_time: 41,
    // user_id:useranalysis.user_id,
    // height: 170,
    // gender: 'male',
    // initial: initial,
    // datetime: useranalysis.createdAt,
    // token: token,

  ,headers: { 'Content-Type': 'multipart/form-data' },
})
    .then(res => res.json())
    .then(json => console.log(json));

    useranalysis={
        user_id:useranalysis.user_id,
        _id:useranalysis._id,
        videouri:videouri,
        createdAt:useranalysis.createdAt,
        kicktype:useranalysis.kicktype
    }
    console.log('useranalysis2',useranalysis)
return useranalysis


}
    async creates(req: any): Promise<any> {
        console.log('analysis', req)
        const newAnalyis = new this.analyticsModel(req);
        console.log('newnewAnalyis', newAnalyis)
        return newAnalyis.save()
    }

    async delete(id: string): Promise<any> {
        return await this.analyticsModel.findByIdAndRemove(id);
    }

    async update(id: string, shared_to: string[],connectioninfo:string[]): Promise<any> {
        console.log('id',id)
        return await this.analyticsModel.findByIdAndUpdate(id, { shared_to: shared_to ,connectioninfo:connectioninfo}, { new: true });
    }
    async updatename(id: string, fileName: string): Promise<any> {
        return await this.analyticsModel.findByIdAndUpdate(id, { fileName: fileName }, { new: true });
    }
    async updatefolderid(id: string, folderId: string): Promise<any> {
        return await this.analyticsModel.findByIdAndUpdate(id, { folderId: folderId }, { new: true });
    }
}