import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersdataModule } from './usersdata/usersdata.module';


import { NotificationModule } from './notifications/notifications.module';



@Module({
  imports: [
   
    UsersdataModule,
    NotificationModule,
    // MongooseModule.forRoot('mongodb+srv://arsalan123:arsalan123@contactkeepermern.xe8pl.mongodb.net/playercloudanalysis?retryWrites=true&w=majority')],
    MongooseModule.forRoot('mongodb+srv://n4beel:aQ3HZ9EzoB9HXBv3@sandbox.mwosc.mongodb.net/connectapp?retryWrites=true&w=majority')],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule { }
