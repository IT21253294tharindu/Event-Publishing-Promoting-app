import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './config/guards/auth.guard';
import { SponsorModule } from './controllers/sponsor/sponsor.module';
import { EventModule } from './controllers/event/event.module';
import { FeedbackModule } from './controllers/feedback/feedback.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    SponsorModule,
    EventModule,
    FeedbackModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
