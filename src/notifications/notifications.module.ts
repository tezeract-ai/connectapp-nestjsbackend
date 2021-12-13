import { NotificationsService } from './notifications.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { NotificationController } from './notifications.controller';
import { NotificationSchema } from './notifications.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }])],
    controllers: [NotificationController],
    providers: [NotificationsService],
})
export class NotificationModule { }
