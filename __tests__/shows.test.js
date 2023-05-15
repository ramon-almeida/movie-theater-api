
const request = require('supertest');
const app = require('../src/app'); 
const User = require('../models/User');
const Show = require('../models/Show');

// Mock the User and Show models
jest.mock('../models/User');
jest.mock('../models/Show');


describe('show Routes', () => {
    beforeEach(() => {
      jest.resetAllMocks(); // Reset mock implementations before each test
    });


it('should get all shows watched by a user', async () => {
    const mockUser = { id: 1, name: 'User 1', getShows: jest.fn() };
    const mockShows = [{ id: 1, title: 'Show 1' }, { id: 2, title: 'Show 2' }];
    mockUser.getShows.mockResolvedValueOnce(mockShows);
    User.findByPk.mockResolvedValueOnce(mockUser);

    const response = await request(app).get('/users/1/shows');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockShows);
    expect(mockUser.getShows).toHaveBeenCalled();
  });

  it('should add a show watched by a user', async () => {
    const mockUser = { id: 1, name: 'User 1' };
    const mockShow = { id: 1, title: 'Show 1', save: jest.fn() };
    User.findByPk.mockResolvedValueOnce(mockUser);
    Show.findByPk.mockResolvedValueOnce(mockShow);

    const response = await request(app)
      .put('/users/1/shows')
      .send({ showId: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockShow);
    expect(mockShow.userId).toBe(mockUser.id);
    expect(mockShow.save).toHaveBeenCalled();
  });
});