import { Request, Response } from 'express';
import Product from '../models/Product.model';

const products = async (req: Request, res: Response): Promise<void> => {
  const products = await Product.findAll({
    attributes: ['id', 'name', 'price', 'available'],
    order: [['name', 'ASC']],
  });
  res.json({
    data: products,
  });
};

const productById = async (req: Request, res: Response): Promise<void> => {
  const product = await Product.findByPk(req.params.id, {
    attributes: ['id', 'name', 'price', 'available'],
  });

  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  res.status(200).json({
    data: product,
  });
};

const createProduct = async (req: Request, res: Response): Promise<void> => {
  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    available: req.body.available,
  });

  res.status(201).json({
    data: product,
    message: 'Product created successfully',
  });
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const product = await Product.findByPk(req.params.id);

  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  const updateProduct = await product.update(
    {
      name: req.body.name,
      price: req.body.price,
      available: req.body.available,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  res.status(200).json({
    data: updateProduct,
    message: 'Product updated successfully',
  });
};

const patchProduct = async (req: Request, res: Response): Promise<void> => {
  const product = await Product.findByPk(req.params.id);

  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  product.available = !product.available;
  await product.save();

  res.json({
    data: product,
    message: 'Availability updated successfully',
  });
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const product = await Product.findByPk(req.params.id);

  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  await product.destroy();
  res.status(200).json({ message: 'Product deleted successfully' });
};

export {
  products,
  productById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
