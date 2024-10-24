import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true, unique: true, index: true, maxlength: 50 })
  title: string;

  @Prop({ required: true, maxlength: 100 })
  content: string;

  @Prop()
  upvotes: number;

  @Prop()
  downvotes: number;

  @Prop({ index: true, required: true })
  author: string;

  @Prop({ index: true })
  upvoters: string[];

  @Prop({ index: true })
  downvoters: string[];

  @Prop()
  tags: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
