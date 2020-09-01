import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String },
  quantity: { type: Number },
});
