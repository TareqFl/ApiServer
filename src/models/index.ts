import { Schema, model } from 'mongoose';

// Products
interface Product {
  title: { type: string; required: true };
  description: { type: string; required: true };
  price: { type: number; required: true };
  discountPercentage: { type: number; required: true };
  rating: { type: number; required: true };
  stock: { type: number; required: true };
  brand: { type: string; required: true };
  category: { type: string; required: true };
  thumbnail: { type: string; required: true };
  images: { type: []; required: true };
}

const productSchema = new Schema<Product>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: Array, required: true },
});

const Products = model<Product>('Product', productSchema);

// Users
interface IUser {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const User = model<IUser>('User', userSchema);

export { Products, User };
