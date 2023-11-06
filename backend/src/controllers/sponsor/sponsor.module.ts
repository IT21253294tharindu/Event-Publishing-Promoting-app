import { Module } from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { SponsorController } from './sponsor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sponsor, SponsorSchema } from 'src/schemas/sponsor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sponsor.name, schema: SponsorSchema }]),
  ],
  providers: [SponsorService],
  controllers: [SponsorController],
})
export class SponsorModule {}
