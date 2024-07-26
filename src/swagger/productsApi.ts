export const productsPath = {
  '/api/products': {
    get: {
      tags: ['Products'],
      summary: 'List all products',
      responses: {
        200: {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Product',
                },
                $ref: '#/components/schemas/Product',
              },
            },
          },
        },
      },
    },
  },
};
