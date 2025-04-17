import z from 'zod'

export const authSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: 'El nombre debe ser un string',
        required_error: 'El nombre es requerido'
      })
      .nonempty({
        message: 'El nombre no puede estar vacío'
      }),

    email: z
      .string({
        invalid_type_error: 'El email debe ser un string',
        required_error: 'El email es requerido'
      })
      .email({
        message: 'El email no es válido'
      }),

    password: z
      .string({
        invalid_type_error: 'La contraseña debe ser un string',
        required_error: 'La contraseña es requerida'
      })
      .min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
      })
      .max(255)
      .regex(/[a-zA-Z]/, {
        message: 'La contraseña debe contener al menos una letra'
      })
      .regex(/\d/, {
        message: 'La contraseña debe contener al menos un número'
      }),

    confirmPassword: z
      .string({
        invalid_type_error: 'La contraseña debe ser un string',
        required_error: 'La confirmación de contraseña es requerida'
      })
      .min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
      })
      .max(255)
      .regex(/[a-zA-Z]/, {
        message: 'La contraseña debe contener al menos una letra'
      })
      .regex(/\d/, {
        message: 'La contraseña debe contener al menos un número'
      })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  })

export const tokenSchema = z.object({
  token: z
    .string()
    .length(6, {
      message: 'El token debe tener 6 dígitos'
    })
    .regex(/^\d+$/, {
      message: 'El token debe contener solo números'
    })
})

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'El email debe ser un string',
      required_error: 'El email es requerido'
    })
    .email({
      message: 'El email no es válido'
    }),
  password: z.string({
    invalid_type_error: 'La contraseña debe ser un string',
    required_error: 'La contraseña es requerida'
  })
})

export const resendConfirmationSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'El email debe ser un string',
      required_error: 'El email es requerido'
    })
    .email({
      message: 'El email no es válido'
    })
})

export const resetPasswordSchema = z
  .object({
    password: z
      .string({
        invalid_type_error: 'La contraseña debe ser un string',
        required_error: 'La contraseña es requerida'
      })
      .min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
      })
      .max(255)
      .regex(/[a-zA-Z]/, {
        message: 'La contraseña debe contener al menos una letra'
      })
      .regex(/\d/, {
        message: 'La contraseña debe contener al menos un número'
      }),

    confirmPassword: z
      .string({
        invalid_type_error: 'La contraseña debe ser un string',
        required_error: 'La confirmación de contraseña es requerida'
      })
      .min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
      })
      .max(255)
      .regex(/[a-zA-Z]/, {
        message: 'La contraseña debe contener al menos una letra'
      })
      .regex(/\d/, {
        message: 'La contraseña debe contener al menos un número'
      })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden'
  })

export const updateProfileSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'El nombre debe ser un string',
      required_error: 'El nombre es requerido'
    })
    .nonempty({
      message: 'El nombre no puede estar vacío'
    }),
  email: z
    .string({
      invalid_type_error: 'El email debe ser un string',
      required_error: 'El email es requerido'
    })
    .email({
      message: 'El email no es válido'
    })
})

export const resetProfilePasswordSchema = z
  .object({
    currentPassword: z
      .string({
        invalid_type_error: 'La contraseña debe ser un string',
        required_error: 'La contraseña es requerida'
      })
      .min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
      })
      .max(255)
      .regex(/[a-zA-Z]/, {
        message: 'La contraseña debe contener al menos una letra'
      })
      .regex(/\d/, {
        message: 'La contraseña debe contener al menos un número'
      }),
    newPassword: z
      .string({
        invalid_type_error: 'La contraseña debe ser un string',
        required_error: 'La contraseña es requerida'
      })
      .min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
      })
      .max(255)
      .regex(/[a-zA-Z]/, {
        message: 'La contraseña debe contener al menos una letra'
      })
      .regex(/\d/, {
        message: 'La contraseña debe contener al menos un número'
      }),

    confirmNewPassword: z
      .string({
        invalid_type_error: 'La contraseña debe ser un string',
        required_error: 'La confirmación de contraseña es requerida'
      })
      .min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
      })
      .max(255)
      .regex(/[a-zA-Z]/, {
        message: 'La contraseña debe contener al menos una letra'
      })
      .regex(/\d/, {
        message: 'La contraseña debe contener al menos un número'
      })
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Las contraseñas no coinciden'
  })
