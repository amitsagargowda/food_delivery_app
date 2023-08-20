import mongoose from 'mongoose';

const connectionString = "mongodb://localhost:27017/food_delivery_app";

export const initializeDB = () => {
  mongoose.set('strictQuery', true);
  mongoose.connect(connectionString, () => {
    console.info('Connected to MongoDB!!');
  });
};
