import mongoose from 'mongoose';
import colors from 'colors';

const connectDb = async () => {
  if (!process.env.MONGO_URL) {
    console.log('MONGO_URL is not defined. Skipping database connection.'.bgYellow.black);
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDb database ${conn.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.log(`Error in MongoDb ${error}`.bgRed.white);
  }
};

export default connectDb;
