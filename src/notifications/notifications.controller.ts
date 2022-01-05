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
  sendNotification(
    @Body('token') token: any,
    @Body('title') title: any,
    @Body('body') body: any
  ): Promise<any> {
    console.log("token")
    return this.notificationsService.sendNotification(token, title, body);
  }

}
