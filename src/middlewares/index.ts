import { Request, Response, NextFunction } from 'express';
import { check, validationResult, param } from 'express-validator';

export const handleInputValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await check('name').notEmpty().withMessage('Name is required.').run(req);
  await check('price')
    .isNumeric()
    .notEmpty()
    .withMessage('Price must be a number.')
    .custom((value) => {
      return value > 0;
    })
    .withMessage('Price must be greater than 0.')
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
};

export const validateProductId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await param('id')
    .isNumeric()
    .notEmpty()
    .withMessage('Product ID is required')
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
};
