import z from 'zod'

export const productSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'El nombre debe ser un string',
      required_error: 'El nombre es requerido'
    })
    .min(3)
    .max(255),

  price: z
    .number({
      invalid_type_error: 'El precio debe ser un número',
      required_error: 'El precio es requerido'
    })
    .min(0.1),

  stock: z
    .number({
      invalid_type_error: 'El stock debe ser un número',
      required_error: 'El stock es requerido'
    })
    .int()
    .min(1),

  active: z
    .boolean({
      invalid_type_error: 'El estado debe ser un booleano',
      required_error: 'El estado es requerido'
    })
    .default(true),

  image: z
    .string({
      invalid_type_error: 'La imagen debe ser un string',
      required_error: 'La imagen es requerida'
    })
    .url({
      message: 'La imagen debe ser una URL válida'
    })
    .optional()
    .nullable(), // Allow null values // Validate URL
    
  description: z
    .string({
      invalid_type_error: 'La descripción debe ser un string',
      required_error: 'La descripción es requerida'
    })
    .min(3)
    .max(255)
}).strict()
