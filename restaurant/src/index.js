import express from 'express';
import { initializeDB } from './db';
import { Menu , Restaurant } from './menu';

const app = express();
const port = 3001;

// connect to database
initializeDB();

app.use(express.json());


app.get('/', async (req, res, next) => {
  try {
    const restlist = await Restaurant.find();
    res.json({
      data: restlist,
    });
  } catch (error) {
    next(error);
  }  
});


app.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const restfound = await Restaurant.findOne({ id: id });
    if (!restfound) {
      const err = new Error('Id Not Found');
      err.status = 404;
      throw err;
    }
    res.json({
      data: restfound,
    });
  } catch (err) {
    next(err);
  }
});

app.get('/:id/menus', async (req, res, next) => {
  try {
    const id = req.params.id;
    const menufound = await Menu.find({ restaurantid: id });
    if (!menufound) {
      const err = new Error('Id Not Found');
      err.status = 404;
      throw err;
    }    
    res.json({
      data: menufound,
    });
  } catch (error) {
    next(error);
  }  
});

app.get('/:id1/menu/:id2', async (req, res, next) => {
  try {
    const restid = req.params.id1;
    const menuid = req.params.id2;
    const menufound = await Menu.find({ restaurantid: restid , id: menuid });
    if (!menufound) {
      const err = new Error('Id Not Found');
      err.status = 404;
      throw err;
    }    
    res.json({
      data: menufound,
    });
  } catch (error) {
    next(error);
  }  
});


app.post('/create', async (req, res, next) => {
  try {
    await Restaurant.create({
      id: req.body.id,
      name: req.body.name,
      phoneno: req.body.phoneno,
      address: req.body.address,
      email: req.body.email,
    });
    res.json({
      message: 'Success!',
    });
  } catch (error) {
    next(error);
  }
});

app.post('/:id/menucreate', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Menu.create({
      id: req.body.id,
      restaurantid: id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
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
