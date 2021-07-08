import * as mongoose from 'mongoose';

export const AnalyticsSchema = new mongoose.Schema({
    user_id: {type: String},
    Thumbnail: {
        type: String,
    },
    kicktype: {
        type: String,
    },
    Post_Frame: {
        type: String,
    },
    AI_Video:  {
        type: String,
    },
    AI_Response:  {
        type: String,
    },
    videouri:  {
        type: String,
    },
    shared_to:  {
        type: Array,
    }, Analysis: {
        type: Array,
    }, connectioninfo: {
        type: Array,
    },
}, {
    timestamps: true,
})


export interface Analytics {

    user_id: string;
    Thumbnail: string;
    Post_Frame: string;
    AI_Video: string;
    videouri: string;

    
    AI_Response: string;
kicktype:string;
    shared_to: string[];

    Analysis: string[]
    connectioninfo:string[]

}
export class CreateAnalyticsDto {
    user_id: string;
    Thumbnail: string;
    Post_Frame: string;
    AI_Video: string;
    AI_Response: string;
    kicktype:string;
    videouri: string;

    shared_to: string[];

    Analysis: string[]
    connectioninfo:string[]

}