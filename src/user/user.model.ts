import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true, maxlength: 50 })
  userId: string;

  @Prop({ required: true, unique: true, index: true, maxlength: 50 })
  email: string;

  @Prop({ required: true, maxlength: 100 })
  displayName: string;

  @Prop({ required: true })
  photoURL: string;

  @Prop({ required: true })
  backgroundURL: string;

  @Prop({
    required: true,
    maxlength: 100,
    default: 'Hey there! I am new user.',
  })
  bio: string;

  @Prop({ required: true })
  dayOfBirth: Date;

  @Prop({ required: false })
  phoneNumber: string;

  @Prop({ index: true, default: [] })
  friends: string[];

  @Prop({ index: true, default: [] })
  friendRequests: string[];

  @Prop({ index: true, default: [] })
  sentRequests: string[];

  @Prop({ index: true, default: [] })
  blockedUsers: string[];

  @Prop({ index: true, default: [] })
  blockedBy: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
