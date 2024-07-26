export const ProductSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      description: 'The product unique identifier',
      example: 1,
    },
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
};
