export const patchProduct = {
  '/api/products/{id}': {
    patch: {
      tags: ['Products'],
      summary: 'Update product availability',
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
