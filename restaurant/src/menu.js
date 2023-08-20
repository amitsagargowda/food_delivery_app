import { Schema, model } from 'mongoose';

const menuSchema = new Schema({
  id: String,
  restaurantid: String,
  name: String,
  description: String,
  price: String,
});

const restaurantSchema = new Schema({
  id: String,
  name: String,
  phoneno: String,
  address: String,
  email: String,
});

export const Menu = model('menu', menuSchema);
export const Restaurant = model('restaurant', restaurantSchema);

