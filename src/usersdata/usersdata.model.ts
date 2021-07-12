import * as mongoose from 'mongoose';

export const UsersdataSchema = new mongoose.Schema({
    userid: { type: String, },
    fcmtoken: { type: String },
})


export interface Usersdata {

    userid: string;
    fcmtoken: string;

}