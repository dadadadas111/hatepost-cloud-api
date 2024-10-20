import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

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

    @Prop({ required: true, maxlength: 100, default: 'Hey there! I am new user.' })
    bio: string;

    @Prop({ required: true })
    dayOfBirth: Date;

    @Prop({required: false})
    phoneNumber: string;

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], index: true, default: [] })
    friends: User[];

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], index: true, default: [] })
    friendRequests: User[];

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], index: true, default: [] })
    sentRequests: User[];

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], index: true, default: [] })
    blockedUsers: User[];

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], index: true, default: [] })
    blockedBy: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);