import { Request, Response, NextFunction } from 'express'

export function syntaxErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof SyntaxError) {
    res.status(400).json({
      message: 'Invalid JSON syntax',
      error: err.message,
      hint: 'Check the JSON syntax and try again.'
    })
  } else {
    next(err) // Pasar el error al siguiente middleware de manejo de errores
  }
}

//* The syntaxErrorHandler middleware is responsible for handling syntax errors in JSON payloads. It checks if the error is an instance of SyntaxError and sends a 400 status code with a message, error, and hint properties. If the error is not a SyntaxError, it passes the error to the next error-handling middleware.
//* This middleware is used in the main application file (app.ts) to handle JSON syntax errors in incoming requests.
