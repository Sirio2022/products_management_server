import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { ProductsController } from '../controllers/produstsController'
import {
  validateProductRequest,
  validateProductUpdateRequest
} from '../middlewares/validate-products'
import upload from '../middlewares/upload'
import { authMiddleware } from '../middlewares/validate-products/auth/auth'

const router: Router = Router()

// Authorize all routes
router.use(asyncHandler(authMiddleware))

router.post(
  '/',
  upload.single('image'),
  asyncHandler(validateProductRequest),
  asyncHandler(ProductsController.createProduct)
)
router.get('/', asyncHandler(ProductsController.getAllProducts))
router.get('/:id', asyncHandler(ProductsController.getProductById))

router.patch(
  '/:id',
  upload.single('image'),
  asyncHandler(validateProductUpdateRequest),
  asyncHandler(ProductsController.updateProduct)
)

router.delete('/:id', asyncHandler(ProductsController.deleteProduct))

export default router
