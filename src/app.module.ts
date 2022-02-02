import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { UsersdataModule } from './usersdata/usersdata.module'
import { AuthModule } from './auth/auth.module'
import { NotificationModule } from './notifications/notifications.module'

@Module({
  imports: [
    UsersdataModule,
    NotificationModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://n4beel:aQ3HZ9EzoB9HXBv3@sandbox.mwosc.mongodb.net/connectapp?retryWrites=true&w=majority'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
