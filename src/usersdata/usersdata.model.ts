import * as mongoose from 'mongoose';

export const UsersdataSchema = new mongoose.Schema({
    userid: { type: String, },
    userdata: { type: Object },
    userlocation:{ type: String, },
    // reqnotif:{type:Boolean,default:false}
})


export interface Usersdata {

    userid: string;
    userdata: object;
    userlocation:string

    // reqnotif:boolean

}