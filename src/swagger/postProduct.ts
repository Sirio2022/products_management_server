export const postProduct = {
  '/api/products': {
    post: {
      tags: ['Products'],
      summary: 'Create a new product',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'The product name',
                  example: 'Curved Monitor 24',
                },
                price: {
                  type: 'number',
                  description: 'The product price',
                  example: 200.0,
                  format: 'decimal',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
        },
        400: {
          description: 'Invalid input',
        },
      },
    },
  },
};
