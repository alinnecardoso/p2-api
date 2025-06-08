const User = require('../User');
const sequelize = require('../../config/database');

describe('User Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com'
    };

    const user = await User.create(userData);
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });

  it('should not create a user with invalid email', async () => {
    const userData = {
      name: 'Test User',
      email: 'invalid-email'
    };

    await expect(User.create(userData)).rejects.toThrow();
  });
}); 