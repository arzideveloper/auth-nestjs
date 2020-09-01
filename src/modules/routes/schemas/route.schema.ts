import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Route extends Document {
  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  methods: string[];

  @Prop()
  roles: string[];
}

export const RouteSchema = SchemaFactory.createForClass(Route);
