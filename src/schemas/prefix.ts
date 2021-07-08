import { Schema, model } from 'mongoose';

const schema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
  },
});

export const prefixSchema = model('prefixes', schema);
