import express, { Request, Response, NextFunction } from 'express'

export function jsonSyntaxErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  express.json()(req, res, (err) => {
    if (err) {
      next(err)
    } else {
      next()
    }
  })
}

//* The jsonSyntaxErrorHandler middleware is responsible for handling JSON syntax errors in incoming requests. It uses the express.json() middleware to parse the JSON payload. If an error occurs during parsing, it passes the error to the next error-handling middleware. If no error occurs, it passes the request to the next middleware in the chain.
