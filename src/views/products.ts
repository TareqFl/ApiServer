import {
  addProduct,
  deleteProduct,
  fetchAll,
  updateProduct,
} from '../controllers/db';
import { Router } from 'express';

const app = Router();

app.get('/', fetchAll);
app.post('/addProduct', addProduct);
app.post('/updateProduct', updateProduct);
app.delete('/deleteProduct', deleteProduct);

export default app;
