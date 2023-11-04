import { Request, Response } from 'express';
import { Products } from '../models';

export const fetchAll = async (req: Request, res: Response) => {
  try {
    const products = await Products.find();
    return res.status(200).json(products);
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    let newProduct = new Products(...product);
    await newProduct.save();
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const updatedDoc = await Products.updateOne(product);
    return res
      .status(200)
      .json({ message: 'Product is Successfully updated', updatedDoc });
  } catch (error) {}
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    await Products.deleteOne(product);
    return res.status(200).json({ message: 'Doc is Successfully Deleted' });
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
};
