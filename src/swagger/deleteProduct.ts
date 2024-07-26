export const deleteProduct = {
  '/api/products/{id}': {
    delete: {
      tags: ['Products'],
      summary: 'Delete product by id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'The product id to delete',
          schema: {
            type: 'integer',
            format: 'int64',
          },
        },
      ],
      responses: {
        200: {
          description: 'Successful operation',
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
