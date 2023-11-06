import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Document<User>;

@Schema()
export class User {
  @Prop()
  userName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  contact: string;

  @Prop()
  accountType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
