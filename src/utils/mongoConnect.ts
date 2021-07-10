import { connect } from 'mongoose';

export const mongo = async (mongoURI: string): Promise<typeof import('mongoose')> => {
  return await connect(mongoURI ?? '', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
};
