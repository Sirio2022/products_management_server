import { Router } from 'express';
import { ProductController } from '../controllers/productControllers';
import { handleInputValidation, validateProductId } from '../middlewares';

const router: Router = Router();

router.get('/', ProductController.products);
router.get('/:id', validateProductId, ProductController.productById);

router.post('/', handleInputValidation, ProductController.createProduct);

router.put(
  '/:id',
  validateProductId,
  handleInputValidation,
  ProductController.updateProduct
);

router.patch('/:id', validateProductId, ProductController.updateProduct);

router.delete('/:id', validateProductId, ProductController.deleteProduct);

export default router;
