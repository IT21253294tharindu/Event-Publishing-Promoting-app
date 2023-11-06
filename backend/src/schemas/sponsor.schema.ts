import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SponsorDocument = Document<Sponsor>;

@Schema()
export class Sponsor {
  @Prop()
  sponsorship: string;

  @Prop()
  budget: number;

  @Prop()
  eventType: string;

  @Prop({ type: [{ type: Object }] })
  location: Record<string, any>;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdUser: Types.ObjectId;
}

export const SponsorSchema = SchemaFactory.createForClass(Sponsor);
