import { connect } from 'mongoose';

export const mongo = async (
  mongoURI: string | undefined,
): Promise<typeof import('mongoose')> => {
  return await connect(mongoURI ?? '', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
};
