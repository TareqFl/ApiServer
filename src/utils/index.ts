import { compare, hash } from 'bcrypt';
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IUser {
  name: string;
  email: string;
}

const SALT = process.env.SALT;
const AUTH_SECERETE_KEY = process.env.AUTH_SECERETE_KEY as string;
const AUTH_REFRESH_KEY = process.env.AUTH_SECERETE_KEY as string;

export async function hashMe(password: string): Promise<string | Error> {
  try {
    const hashedPass = await hash(password, Number(SALT));
    return hashedPass;
  } catch (error) {
    const err = error as Error;

    return err;
  }
}

export async function compareMe(
  password: string,
  hash: string
): Promise<boolean | Error> {
  try {
    const fact = await compare(password, hash);
    return fact;
  } catch (error) {
    const err = error as Error;
    return err;
  }
}

export const generateToken = (user: IUser): string => {
  return jwt.sign({ data: user }, AUTH_SECERETE_KEY, { expiresIn: '7d' });
};
export const regenToken = (user: IUser): string => {
  return jwt.sign({ data: user }, AUTH_REFRESH_KEY, { expiresIn: '15m' });
};

export const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization as string;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, AUTH_SECERETE_KEY, (err) => {
      if (err) {
        return res.status(401).json('Token is Not Valid');
      }
      next();
    });
  } else {
    return res.status(401).json({ message: 'Not Authenticated' });
  }
};
