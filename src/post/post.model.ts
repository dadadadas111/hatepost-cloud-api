import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/user.model";

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
    @Prop({ required: true, unique: true, index: true, maxlength: 50 })
    title: string;

    @Prop({ maxlength: 100 })
    content: string;

    @Prop()
    upvotes: number;

    @Prop()
    downvotes: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true })
    author: User;

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], index: true })
    upvoters: User[];

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], index: true })
    downvoters: User[];
}

export const PostSchema = SchemaFactory.createForClass(Post);