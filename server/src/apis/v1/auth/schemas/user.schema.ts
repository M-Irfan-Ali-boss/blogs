import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ isRequired: true, trim: true, minlength: 3 })
  name: string;

  @Prop({
    isRequired: true,
    trim: true,
    unique: true,
    immutable: true,
  })
  email: string;

  @Prop({ isRequired: true, trim: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
