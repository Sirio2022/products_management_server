export const getProductById = {
  '/api/products/{id}': {
    get: {
      tags: ['Products'],
      summary: 'Get product by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'The product id to get',
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
      responses: {
        200: {
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
        404: {
          description: 'Product not found',
        },
      },
    },
  },
};
