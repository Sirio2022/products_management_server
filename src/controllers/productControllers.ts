import { Request, Response } from 'express';
import Product from '../models/Product.model';

export class ProductController {
  static async products(req: Request, res: Response) {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price', 'available'],
      order: [['name', 'ASC']],
    });
    res.json({
      data: products,
    });
  }

  static async productById(req: Request, res: Response) {
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
  }

  static async createProduct(req: Request, res: Response) {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      available: req.body.available,
    });

    res.status(201).json({
      data: product,
      message: 'Product created successfully',
    });
  }

  static async updateProduct(req: Request, res: Response) {
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
  }

  static async patchProduct(req: Request, res: Response) {
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
  }

  static async deleteProduct(req: Request, res: Response) {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
  }
}
