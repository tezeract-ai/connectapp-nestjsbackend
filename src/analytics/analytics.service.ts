import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Analytics } from './analytics.model'
@Injectable()
export class AnalyticsService {
    constructor(@InjectModel('Analytics') private readonly analyticsModel: Model<any>) { }

    async findAll(): Promise<any> {
        return await this.analyticsModel.find();
    }

    async findOne(id: string): Promise<any> {
        return await this.analyticsModel.findOne({ _id: id });
    }

    async filteredAnalysis(userId: any): Promise<any> {
        console.log('userId', userId)
        const findbyuserid = await this.analyticsModel.find( { $or: [ { shared_to:userId} , { user_id: userId } ] } );



    console.log('findbyuserid', findbyuserid)
    return findbyuserid


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