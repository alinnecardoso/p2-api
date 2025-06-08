const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');

let server;

beforeAll(() => {
  server = app.listen(0);
});

afterAll(async () => {
  await new Promise(resolve => server.close(resolve));
  await sequelize.close();
});

describe('Health Check', () => {
  it('should return status OK', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
}); 