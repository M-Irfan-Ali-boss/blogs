import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Blog {
  @Prop({ required: true, trim: true })
  title: string;
  @Prop({ required: true, trim: true })
  description: string;
  @Prop({
    required: true,
    trim: true,
    default: 'inactive',
    enum: ['active', 'inactive', 'draft'],
  })
  status: string;
  @Prop({
    type: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    required: true,
  })
  picture: {
    url: string;
    publicId: string;
  };
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
