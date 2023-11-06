import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FeedbackDocument = Document<Feedback>;

@Schema()
export class Feedback {
  @Prop()
  feedback: string;

  @Prop()
  date: string;

  @Prop()
  rating: number;

  @Prop({ type: Types.ObjectId, ref: 'Event' })
  eventId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createUser: Types.ObjectId;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
