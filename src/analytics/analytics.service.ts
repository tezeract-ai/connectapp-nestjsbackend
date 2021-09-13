import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Analytics } from './analytics.model'
import * as admin from "firebase-admin";
import fetch from 'node-fetch'
import { json } from 'express';
const serviceAccount = require("../../player-cloud-tech-firebase-adminsdk-73bm5-a080777234.json");
var FormData = require('form-data');
var fs = require('fs');


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
        const findbyuserid = await this.analyticsModel.find({ $or: [{ shared_to: user_id }, { user_id: user_id }] }).sort({ _id: -1 });



        console.log('findbyuserid', findbyuserid)
        return findbyuserid


    }
    async createtoken(token: any, body: any, title: any, res: any): Promise<any> {

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
            .then(response => {
                //configure your response here

                res.status(200).send({ message: "Notification sent successfully" })
                console.log('response', response)

            })
            .catch(error => {
                console.log(error);
            });

    }


    async sendAnalysis(user_id: any,userName:any, gender:any,height:any,kickingFoot:any,videouri: any, kicktype: string, useravatar:any,token: any, video: any): Promise<any> {
        console.log('sharedanalysis', user_id, userName,gender,height,kickingFoot,videouri, video, kicktype, useravatar,token)
        try {
            // throw[404,'something went wrong']        
let kickfoot=kickingFoot==='Left Foot' ? 'Left' : 'Right'
console.log('kickfoot',kickfoot)
            let formData = new FormData();
            const newAnalyis = await new this.analyticsModel({ user_id: user_id,userName:userName, kicktype: kicktype, useravatar:useravatar,videouri: videouri });
            console.log('newAnalyis', newAnalyis)
            let useranalysis = await newAnalyis.save()
            console.log('useranalysis', useranalysis)
            const findUserIdinAnalysis = await this.analyticsModel.find({ user_id: user_id })
            const initial = findUserIdinAnalysis ? 'False' : 'True'
            var filetype = 'video'
            var filename = 'video'
            console.log('initial', initial)
            console.log('useranalysis', useranalysis, useranalysis._id, useranalysis.user_id, video)
            formData.append('video_1', video.buffer, filename)
            formData.append('video_2', '')
            formData.append('video_3', '')
            formData.append('video_flag_01', 'True')
            formData.append('video_flag_02', 'False')
            formData.append('video_flag_03', 'False')
            formData.append('user_id', useranalysis.user_id)
            formData.append('height', height)
            formData.append('gender', gender)
            formData.append('analysis_id', useranalysis._id + '')
            formData.append('initial', initial)
            formData.append('kick_type', kickfoot)

            formData.append('token', token)

            const options = {
                method: 'POST',
                body: formData,
                headers: formData.getHeaders()
            }
            try {
                fetch('http://139.59.34.247:5000/api/video_processing', options)
            } catch (error) {
                console.log('error', error)
            }
            // .then(res => res.json())
            // .then(json => console.log(json)).catch(err=>console.log('error res',err));
            useranalysis = {
                user_id: useranalysis.user_id,
                userName:useranalysis.userName,
                _id: useranalysis._id,
                videouri: useranalysis.videouri,
                createdAt: useranalysis.createdAt,
                kicktype: useranalysis.kicktype,
                useravatar:useranalysis.useravatar
            }
            console.log('useranalysis2', useranalysis)
            return useranalysis
        } catch (error) {
            throw [404, 'something went wrong']
        }
    }
    async sendImage(user_id: any,image: any): Promise<any> {
        console.log('sendimage', user_id, image)
        try {
            // throw[404,'something went wrong']        
            let formData = new FormData();

            var filename = 'image'
            formData.append('Image', image.buffer, filename)
            formData.append('user_id',user_id)
       
          

            const options = {
                method: 'POST',
                body: formData,
                headers: formData.getHeaders()
            }
            let hosteduri
            try {
                fetch('http://139.59.34.247:5000/api/Profile_Picture', options).then(response => hosteduri=response.json())
            } catch (error) {
                console.log('error', error)
            }
            console.log('hosteduri',hosteduri)
            return hosteduri
            // .then(res => res.json())
            // .then(json => console.log(json)).catch(err=>console.log('error res',err));
         
            
        } catch (error) {
            throw [404, 'something went wrong']
        }
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

    async update(id: string, shared_to: string[], connectioninfo: string[]): Promise<any> {
        console.log('id', id)
        return await this.analyticsModel.findByIdAndUpdate(id, { shared_to: shared_to, connectioninfo: connectioninfo }, { new: true });
    }
    async updatename(id: string, fileName: string): Promise<any> {
        return await this.analyticsModel.findByIdAndUpdate(id, { fileName: fileName }, { new: true });
    }
    async updatefolderid(id: string, folderId: string): Promise<any> {
        return await this.analyticsModel.findByIdAndUpdate(id, { folderId: folderId }, { new: true });
    }
    async createbeatthat(analyticsid: string,userid:string): Promise<any> {
        console.log('id', analyticsid,userid)
        let beatthatanalysis= await this.analyticsModel.findOne({_id:analyticsid})
        console.log('beatthatanalysis',beatthatanalysis)
        beatthatanalysis.shared_to.push(userid)
        console.log('beatthatanalysis2',beatthatanalysis)
        return beatthatanalysis.save()



    }
}