import { body, validationResult, param } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleInputErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Ejecuta las validaciones
  await body('name').notEmpty().withMessage('Name is required').run(req);
  await body('price')
    .isNumeric()
    .notEmpty()
    .withMessage('Price is required')
    .custom((value) => value > 0)
    .withMessage('Price must be greater than 0')
    .run(req);

  // Verifica si hay errores después de la validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Si no hay errores, continúa con el siguiente middleware
  next();
};

export const validateProductId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await param('id')
    .isNumeric()
    .notEmpty()
    .withMessage('Product ID is required')
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
