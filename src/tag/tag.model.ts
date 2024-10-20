import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type TagDocument = HydratedDocument<Tag>;

@Schema({ timestamps: true })
export class Tag {

    @Prop({ required: true, unique: true, index: true, maxlength: 50 })
    label: string;

    @Prop({ maxlength: 100 })
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', index: true })
    superTag: Tag;

}

export const TagSchema = SchemaFactory.createForClass(Tag);