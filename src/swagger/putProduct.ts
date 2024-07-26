export const putProduct = {
  '/api/products/{id}': {
    put: {
      tags: ['Products'],
      summary: 'Update product by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'The product id to update',
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
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
                available: {
                  type: 'boolean',
                  description: 'The product availability',
                  example: true,
                },
              },
            },
          },
        },
      },
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
          description: 'Invalid input or invalid id',
        },
        404: {
          description: 'Product not found',
        },
      },
    },
  },
};
