import express from 'express';
import { initializeDB } from './db';
import { Order } from './menu';

const app = express();
const port = 3000;


// connect to database
initializeDB();

app.use(express.json());

app.get('/', async (req, res, next) => {
  try {
    const orderlist = await Order.find();
    res.json({
      data: orderlist,
    });
  } catch (error) {
    next(error);
  }  
});

app.get('/allorders', async (req, res, next) => {
  try {
    const orderlist = await Order.find();
    res.json({
      data: orderlist,
    });
  } catch (error) {
    next(error);
  }  
});

app.get('/order/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const orderlist = await Order.find({ id: id });
    res.json({
      data: orderlist,
    });
  } catch (error) {
    next(error);
  }  
});

app.post('/createorder', async (req, res, next) => {
  try {
    await Order.create({
      id: req.body.id,
      restaurantid: req.body.restaurantid,
      itemname: req.body.itemname,
      itemprice: req.body.itemprice,
      itemquantity: req.body.itemquantity,
    });
    res.json({
      message: 'Success!',
    });
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log('listening to port', port);
});
