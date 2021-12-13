import { NotificationsService } from './notifications.service';
import {
    Body,
    Controller,
    Get,
    Post,
} from '@nestjs/common';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Post()
    sendNotification(@Body('token') token: any): Promise<any> {
      console.log("token")
      return this.notificationsService.sendNotification(token);
    }

}
