import * as mongoose from 'mongoose';

export const AnalyticsSchema = new mongoose.Schema({
    user_id: {type: String},
    thumbnail: {
        type: Array,
    },
    kicktype: {
        type: String,
    },
    Post_Frame: {
        type: String,
    },
    ai_video:  {
        type: Array,
    },
    ai_response:  {
        type: Array,
    },
    videouri:  {
        type: String,
    },
    shared_to:  {
        type: Array,
    }, analysis: {
        type: Array,
    }, connectioninfo: {
        type: Array,
    },
}, {
    timestamps: true,
})


export interface Analytics {

    user_id: string;
    thumbnail: string[];
    Post_Frame: string;
    ai_video: string[];
    videouri: string;
video:any
    
    ai_response: string[];
kicktype:string;
    shared_to: string[];

    analysis: string[]
    connectioninfo:string[]

}
export class CreateAnalyticsDto {
    user_id: string;
    thumbnail: string[];
    Post_Frame: string;
    ai_video: string[];
    ai_response: string;
    kicktype:string;
    videouri: string;
video:any;
    shared_to: string[];

    analysis: string[]
    connectioninfo:string[]

}