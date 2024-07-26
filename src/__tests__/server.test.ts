import request from "supertest";
import server from "../server";
import db from "../config/db";
import { connectToDatabase } from "../server";

describe('GET /api', () => {
    it('should return 200 OK', async () => {
        const response = await request(server).get('/api');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));

        expect(response.status).not.toEqual(404);
        expect(response.status).not.toEqual(expect.stringContaining('html'));
    });

    it('should return message "API is running..."', async () => {
        const response = await request(server).get('/api');
        expect(response.body.message).toEqual('API is running...');
    });
});

jest.mock('../config/db' , () => {
    return {
        authenticate: jest.fn(),
        sync: jest.fn()
    };
});

describe('connect to database', () => {
  it('should handle database connection errors', async () => {
    jest
      .spyOn(db, 'authenticate')
      .mockRejectedValue(new Error('Unable to connect to the database:'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    await connectToDatabase();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unable to connect to the database:'),
        expect.any(Error)
    );
  });
});