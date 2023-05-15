const request = require('supertest');
const app = require('../src/app'); 
const User = require('../models/User');


// Mock the User and Show models
jest.mock('../models/User');
jest.mock('../models/Show');

describe('User Routes', () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Reset mock implementations before each test
  });

  it('should get all users', async () => {
    const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
    User.findAll.mockResolvedValueOnce(mockUsers);

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  it('should get a user by ID', async () => {
    const mockUser = { id: 1, name: 'User 1' };
    User.findByPk.mockResolvedValueOnce(mockUser);

    const response = await request(app).get('/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });
});