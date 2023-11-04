import * as dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import products from './views/products';
import authentication from './views/authentication';

const MONGO = process.env.MONGO as string;
const PORT = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: '*',
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/products', products);
app.use('/authentication', authentication);

const server = http.createServer(app);

mongoose.connect(`${MONGO}`);
const connection = mongoose.connection;

connection.once('open', () =>
  server.listen(PORT, () => console.log(`Server is up and running on ${PORT}`))
);
