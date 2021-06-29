import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { AuthModule } from './auth/auth.module';
import { AnalyticsModule } from './analytics/analytics.module';

import { AnalyticsController } from './analytics/analytics.controller';
import { AnalyticsService } from './analytics/analytics.service';



@Module({
  imports: [
    ProductModule,
    NodemailerModule,
    AuthModule,
    AnalyticsModule,
    MongooseModule.forRoot('mongodb+srv://arsalan123:arsalan123@contactkeepermern.xe8pl.mongodb.net/playercloudanalysis?retryWrites=true&w=majority')],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule { }
