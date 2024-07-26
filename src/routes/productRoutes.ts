import { Router } from 'express';
import {
  products,
  productById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
} from '../controllers/productController';
import { handleInputErrors, validateProductId } from '../middlewares';

const router: Router = Router();

router.get('/', products);
router.get('/:id', validateProductId, productById);

router.post('/', handleInputErrors, createProduct);

router.put('/:id', validateProductId, handleInputErrors, updateProduct);

router.patch('/:id', validateProductId, patchProduct);

router.delete('/:id', validateProductId, deleteProduct);

export default router;
