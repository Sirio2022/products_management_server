import { Request, Response, NextFunction } from 'express'
import Product from '../models/Product'
import { v2 as cloudinary } from 'cloudinary'
import stream from 'node:stream'
import path from 'node:path'

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
// Cloudinary configuration

export class ProductsController {
  static async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name } = req.body

    const productExists = await Product.findOne({
      where: { name }
    })

    if (productExists) {
      if (req.user?.id !== productExists.manager) {
        res.status(403).json({
          message:
            'Product already exists and belongs to another user. You do not have permission to create this product.'
        })
        return
      }

      if (productExists.active) {
        res.status(409).json({
          message: 'Product already exists. Please use another name.'
        })
        return
      }

      // Reactivate the product if it belongs to the same user and is inactive
      productExists.active = true
      await productExists.save()
      res.status(200).json({
        message: 'Product already exists. Product reactivated successfully.',
        product: productExists
      })
      return
    }

    // Upload image to Cloudinary
    if (req.file) {
      const bufferStream = new stream.PassThrough()
      bufferStream.end(req.file.buffer)

      try {
        const fileNameWithoutExt = path.parse(req.file.originalname).name

        const result = await new Promise((resolve, reject) => {
          bufferStream.pipe(
            cloudinary.uploader.upload_stream(
              {
                folder: 'products_management_2025',
                public_id: fileNameWithoutExt,
                overwrite: true,
                resource_type: 'image',
                transformation: [
                  {
                    width: 500,
                    height: 500,
                    crop: 'auto',
                    quality: 'auto',
                    fetch_format: 'auto'
                  }
                ]
              },
              (error, result) => {
                if (error) {
                  reject(new Error(error.message))
                } else {
                  resolve(result)
                }
              }
            )
          )
        })

        req.body.image = (result as any).secure_url
      } catch (error) {
        return next(error)
      }
    }

    // Create product
    const newProduct = await Product.create({
      ...req.body,
      manager: req.user?.id
    })

    res.status(201).json({
      message: 'Product created successfully.',
      product: newProduct
    })
  }
  static async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const products = await Product.findAll({
      where: { active: true, manager: req.user?.id },
      order: [['createdAt', 'DESC']]
    })

    if (products.length === 0) {
      res.status(404).json({
        message:
          'There are no products in the database. Please create products first.'
      })
      return
    }

    res.status(200).json({ products })
  }

  static async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params
    const product = await Product.findOne({
      where: { id, manager: req.user?.id }
    })

    if (req.user?.id !== product?.manager) {
      res.status(403).json({
        message: 'You do not have permission to access this product.'
      })
      return
    }

    if (!product || product.active === false) {
      res.status(404).json({ message: 'Product not found.' })
      return
    }

    res.status(200).json({
      product
    })
  }

  static async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ message: 'Product ID is required.' })
      return
    }

    const product = await Product.findOne({
      where: { id, manager: req.user?.id }
    })

    if (req.user?.id !== product?.manager) {
      res.status(403).json({
        message: 'You do not have permission to access this product.'
      })
      return
    }

    if (!product || product.active === false) {
      res.status(404).json({ message: 'Product not found.' })
      return
    }

    // Obtener los datos del producto del campo 'product'
    let updateData = {}

    if (req.body) {
      updateData = { ...req.body }
    }

    // Upload image to Cloudinary if present
    if (req.file) {
      const bufferStream = new stream.PassThrough()
      bufferStream.end(req.file.buffer)

      try {
        const fileNameWithoutExt = path.parse(req.file.originalname).name

        const result = await new Promise((resolve, reject) => {
          bufferStream.pipe(
            cloudinary.uploader.upload_stream(
              {
                folder: 'products_management_2025',
                public_id: fileNameWithoutExt,
                overwrite: true,
                resource_type: 'image',
                transformation: [
                  {
                    width: 500,
                    height: 500,
                    crop: 'auto',
                    quality: 'auto',
                    fetch_format: 'auto'
                  }
                ]
              },
              (error, result) => {
                if (error) {
                  reject(new Error(error.message))
                } else {
                  resolve(result)
                }
              }
            )
          )
        })

        updateData = {
          ...updateData,
          image: (result as any).secure_url
        }
      } catch (error) {
        return next(error)
      }
    }

    const editedProduct = await product.update(updateData)

    res.status(200).json({
      message: 'Product updated successfully.',
      product: editedProduct
    })
  }

  static async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params

    const product = await Product.findOne({
      where: { id, manager: req.user?.id }
    })

    if (req.user?.id !== product?.manager) {
      res.status(403).json({
        message: 'You do not have permission to access this product.'
      })
      return
    }

    if (!product || product.active === false) {
      res.status(404).json({ message: 'Product not found.' })
      return
    }

    await product.update({ active: false })

    res.status(200).json({
      message: 'Product deleted successfully.'
    })
  }
}
