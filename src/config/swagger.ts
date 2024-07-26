import swaggerJSDoc from 'swagger-jsdoc';
import { ProductSchema } from '../swagger/productSchema';
import { productsPath } from '../swagger/productsApi';
import { getProductById } from '../swagger/getProductById';
import { postProduct } from '../swagger/postProduct';
import { putProduct } from '../swagger/putProduct';
import { patchProduct } from '../swagger/patchProduct';
import { deleteProduct } from '../swagger/deleteProduct';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.1.0',
    tags: [
      {
        name: 'Products',
        description: 'API for products in the store',
      },
    ],
    info: {
      title: 'REST API with Node.js, Express, and TypeScript',
      version: '1.0.0',
      description: 'REST API documentation with Swagger',
    },
    components: {
      schemas: {
        Product: ProductSchema,
      },
    },
    paths: {
      '/api/products': {
        ...productsPath['/api/products'],
        ...postProduct['/api/products'],
      },
      '/api/products/{id}': {
        ...getProductById['/api/products/{id}'],
        ...putProduct['/api/products/{id}'],
        ...patchProduct['/api/products/{id}'],
        ...deleteProduct['/api/products/{id}'],
      },
    },
  },

  apis: ['./src/routes/*.ts', './src/swagger/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link {
      content: url('https://react-app-portfolio-beryl.vercel.app/assets/Logo-Transparency-(Web)-CM3Tltpe.png');
      height: 150px;
      width: auto;
      margin: 0 auto;
    }`,
  customSiteTitle: 'REST API with Node.js, Express, and TypeScript',
};

export default swaggerSpec;
export { swaggerUiOptions };
