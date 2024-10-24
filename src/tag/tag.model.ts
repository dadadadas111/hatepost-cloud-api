import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TagDocument = HydratedDocument<Tag>;

@Schema({ timestamps: true })
export class Tag {
  @Prop({ required: true, unique: true, index: true, maxlength: 50 })
  label: string;

  @Prop({ maxlength: 100 })
  description: string;

  @Prop({ index: true })
  superTag: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
