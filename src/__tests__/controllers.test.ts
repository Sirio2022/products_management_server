import request from 'supertest';
import server from '../server';

describe('POST /api/products', () => {
  it('should return 400 all fields are required', async () => {
    const response = await request(server).post('/api/products').send({});
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.errors).not.toBe(null);
  });

  it('should return 400 if name is missing', async () => {
    const response = await request(server).post('/api/products').send({
      price: 99.99,
    });
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.errors).not.toBe(null);
  });

  it('should validate that the price is greater than 0', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Refrigeración liquida Cooler Master II',
      price: 0,
    });
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.errors).not.toBe(null);
  });

  it('should validate that the price is a number', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Refrigeración liquida Cooler Master II',
      price: 'not a number',
    });
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(2);

    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.errors).not.toBe(null);
  });

  it('should create a new product', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Test Product',
      price: 99.99,
    });
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.message).toEqual('Product created successfully');

    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.data).not.toBe(null);
    expect(response.body).not.toEqual(expect.stringContaining('error'));
  });
});

describe('GET /api/products', () => {
  it('should check if api/products exists', async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);

    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.data).not.toBe(null);
  });

  it('should return an array of products', async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);

    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.data).not.toBe(null);
  });
});

describe('GET /api/products/:id', () => {
  it('should return 404 if product not found', async () => {
    const productId = 999;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Product not found');

    expect(response.status).not.toEqual(200);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.error).not.toBe(null);
  });

  it('should check a valid id in the url', async () => {
    const productId = 'not-a-valid-id';
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toEqual('Invalid value');

    expect(response.status).not.toEqual(200);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.error).not.toBe(null);
  });

  it('should return a product by id', async () => {
    const productId = 1;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data).toHaveProperty('name');
    expect(response.body.data).toHaveProperty('price');

    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.data).not.toBe(null);
  });
});

describe('PUT /api/products/:id', () => {
  it('should check a valid id in the url', async () => {
    const productId = 'not-a-valid-id';
    const response = await request(server).put(`/api/products/${productId}`);
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toEqual('Invalid value');

    expect(response.status).not.toEqual(200);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.error).not.toBe(null);
  });

  it('should update a product', async () => {
    const productId = 1;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: 'Updated Product',
        price: 299.99,
      });
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Product updated successfully');

    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.data).not.toBe(null);
  });

  it('should return 404 if product not found', async () => {
    const productId = 999;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: 'Updated Product',
        price: 199.99,
      });
    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Product not found');

    expect(response.status).not.toEqual(200);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.error).not.toBe(null);
  });

  it('should return 400 price must be greater than 0', async () => {
    const productId = 1;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: 'Updated Product',
        price: 0,
      });
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toEqual('Price must be greater than 0');

    expect(response.status).not.toEqual(200);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.error).not.toBe(null);
  });
});

describe('PATCH /api/products/:id', () => {
  it('should check a valid id in the url', async () => {
    const productId = 'not-a-valid-id';
    const response = await request(server).patch(`/api/products/${productId}`);
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toEqual('Invalid value');

    expect(response.status).not.toEqual(200);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.error).not.toBe(null);
  });

  it('should update a product', async () => {
    const productId = 1;
    const response = await request(server).patch(`/api/products/${productId}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.message).toEqual('Product updated successfully');

    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.data).not.toBe(null);
  });

  it('should return 404 if product not found', async () => {
    const productId = 999;
    const response = await request(server).patch(`/api/products/${productId}`);
    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Product not found');

    expect(response.status).not.toEqual(200);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.error).not.toBe(null);
  });
});

describe('DELETE /api/products/:id', () => {
  it('should check a valid id in the url', async () => {
    const productId = 'not-a-valid-id';
    const response = await request(server).delete(`/api/products/${productId}`);
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toEqual('Invalid value');

    expect(response.status).not.toEqual(200);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.error).not.toBe(null);
  });

  it('should delete a product', async () => {
    const productId = 1;
    const response = await request(server).delete(`/api/products/${productId}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Product deleted successfully');

    expect(response.status).not.toEqual(404);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.data).not.toBe(null);
  });

  it('should return 404 if product not found', async () => {
    const productId = 999;
    const response = await request(server).delete(`/api/products/${productId}`);
    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Product not found');

    expect(response.status).not.toEqual(200);
    expect(response.status).not.toEqual(expect.stringContaining('html'));
    expect(response.body).not.toBe(null);
    expect(response.body.error).not.toBe(null);
  });
});
