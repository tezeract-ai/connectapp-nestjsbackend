import * as mongoose from 'mongoose';

export const UsersdataSchema = new mongoose.Schema({
    userid: { type: String, },
    userdata: { type: Object },
    expotoken: { type: String },
    location: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number] }
      },   // reqnotif:{type:Boolean,default:false}
      connection:{type:Array}
})
UsersdataSchema.index({location:"2dsphere"})


export interface Usersdata {

    userid: string;
    userdata: object;
    expotoken:string;
    connection:string[]
    // reqnotif:boolean

}