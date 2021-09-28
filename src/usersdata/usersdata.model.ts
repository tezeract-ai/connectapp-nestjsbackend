import * as mongoose from 'mongoose';

export const UsersdataSchema = new mongoose.Schema({
    userid: { type: String, },
    userdata: { type: Object },
    location: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number] }
      },   // reqnotif:{type:Boolean,default:false}
})
UsersdataSchema.index({location:"2dsphere"})


export interface Usersdata {

    userid: string;
    userdata: object;

    // reqnotif:boolean

}