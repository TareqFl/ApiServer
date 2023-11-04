import { Request, Response } from 'express';
import { User } from '../models';
import { compareMe, generateToken, hashMe, regenToken } from '../utils';

export const Authenticate = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(200).json({
        err: true,
        message: 'Choose a different email or Login instead',
      });
    }

    const hash = await hashMe(password);
    if (typeof hash === 'object') {
      return res
        .status(500)
        .json({ message: 'Something went wrong try again', err: true });
    }
    const newUser = new User({
      email,
      name,
      password: hash,
    });
    await newUser.save();

    const token = generateToken({ name, email });

    return res.status(200).json({ message: `Authenticated`, token });
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(200).json({
        err: true,
        message: `No user with email ${email} is found register instead or make sure you typed correctly`,
      });
    }

    const isValidPassword = compareMe(password, userFound.password);
    if (!isValidPassword) {
      return res.status(400).json({ err: true, message: `Wrong password` });
    }
    const user = {
      email,
      name: userFound.name,
    };
    const accessToken = generateToken(user);
    res.status(200).json({ accessToken, message: 'Authenticated' });
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const refreshToken = regenToken({ name, email });

    res.status(200).json({ message: 'Refresh', refreshToken });
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
};

export const logout = (req: Request, res: Response) => {
  const { token } = req.body;
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const isDeleted = await User.findOneAndDelete({ email });

    if (!isDeleted) {
      return res
        .status(200)
        .json({ message: 'Something Went wrong please try again' });
    }
    return res.status(200).json({ message: 'Account removed' });
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
};
