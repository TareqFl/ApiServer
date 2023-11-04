import { Router } from 'express';
import {
  Authenticate,
  deleteAccount,
  login,
  logout,
  refreshToken,
} from '../controllers/auth';
import { verifyTokenMiddleware } from '../utils';

const app = Router();

app.post('/', Authenticate);
app.post('/login', login);
app.post('/refreshToken', refreshToken);
app.post('/logout', verifyTokenMiddleware, logout);
app.delete('/deleteAccount', verifyTokenMiddleware, deleteAccount);

export default app;
