import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  id: String,
  restaurantid: String,
  itemname: String,
  itemprice: String,
  itemquantity: String,
});

export const Order = model('order', orderSchema);

