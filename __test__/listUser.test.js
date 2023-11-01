const listUser = require('../controller/listUser'); 

// Mock userDetail and Express response object
const userDetail = require('../models').userDetail;
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

describe('listUser', () => {
  it('should return a list of users when the database is not empty', async () => {
    // Mock the userDetail.findAll method to return a list of users
    userDetail.findAll = jest.fn(() => Promise.resolve(['User1', 'User2'])); // Replace with expected data

    await listUser({}, res);

    expect(userDetail.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(['User1', 'User2']); // Replace with expected data
  });

  it('should return status code 204 and a message when the database is empty', async () => {
    // Mock the userDetail.findAll method to return an empty array
    userDetail.findAll = jest.fn(() => Promise.resolve([]));

    await listUser({}, res);

    expect(userDetail.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204); // 204 (No Content)
    expect(res.json).toHaveBeenCalledWith("List is empty");
  });

  it('should handle errors and return a 500 status code for internal server error', async () => {
    // Mock the userDetail.findAll to simulate an error
    userDetail.findAll = jest.fn(() => {
      throw new Error('Database Error');
    });

    await listUser({}, res);

    expect(res.status).toHaveBeenCalledWith(500); // 500 (Internal Server Error)
    expect(res.json).toHaveBeenCalledWith("Internal Server Error");
  });
});
