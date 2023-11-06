import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Document<Event>;

@Schema()
export class Event {
  @Prop()
  eventName: string;

  @Prop()
  eventType: string;

  @Prop()
  date: string;

  @Prop({ type: Object })
  location: Record<string, any>;

  @Prop()
  time: string;

  @Prop()
  expectedCrowd: number;

  @Prop()
  expectedBudget: number;

  @Prop()
  ticketCount: number;

  @Prop()
  ticketPrice: number;

  @Prop()
  soldTickets: number;

  @Prop()
  description: string;

  @Prop({ type: [String] })
  images: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createUser: Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);
