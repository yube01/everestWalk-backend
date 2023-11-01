const updateUser = require('../controller/updateUser'); // Replace with the actual path to your updateUser module

// Mock userDetail and Express response object
const userDetail = require('../models').userDetail; // Replace with the path to your userDetail model
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

describe('updateUser', () => {
  it('should update a user when the user exists and data is valid', async () => {
    const userId = 1; // Replace with an existing user ID

    // Mock the userDetail.findOne, userDetail.update, and userDetail.findOne methods
    userDetail.findOne = jest.fn(() => Promise.resolve({ id: userId })); // Simulate an existing user
    userDetail.update = jest.fn(() => Promise.resolve());
    userDetail.findOne = jest.fn(() => Promise.resolve({ id: userId, name: 'User1', email: 'user1@example.com', phoneNumber: '1234567890' })); // Simulate updated user data

    const req = {
      params: { id: userId },
      body: {
        name: 'Updated User',
        email: 'updated@example.com',
        phoneNumber: '9876543210',
      },
    };

    await updateUser(req, res);

    expect(userDetail.findOne).toHaveBeenCalledWith({
      where: {
        id: userId
      }
    });
    expect(userDetail.update).toHaveBeenCalledWith(
      {
        name: 'Updated User',
        email: 'updated@example.com',
        phoneNumber: '9876543210',
      },
      {
        where: {
          id: userId
        }
      }
    );
    expect(userDetail.findOne).toHaveBeenCalledWith({
      where: {
        id: userId
      }
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: userId,
      name: 'Updated User',
      email: 'updated@example.com',
      phoneNumber: '9876543210',
    });
  });

  it('should return a 404 status code and a message when the user does not exist', async () => {
    const userId = 1; // Replace with a non-existing user ID

    // Mock the userDetail.findOne to simulate a non-existing user
    userDetail.findOne = jest.fn(() => Promise.resolve(null));

    const req = {
      params: { id: userId },
      body: {
        name: 'Updated User',
        email: 'updated@example.com',
        phoneNumber: '9876543210',
      },
    };

    await updateUser(req, res);

    expect(userDetail.findOne).toHaveBeenCalledWith({
      where: {
        id: userId
      }
    });

    expect(userDetail.update).not.toHaveBeenCalled(); // Update method should not be called
    expect(userDetail.findOne).not.toHaveBeenCalled(); // Second findOne should not be called

    expect(res.status).toHaveBeenCalledWith(404); // 404 (Not Found)
    expect(res.json).toHaveBeenCalledWith("User not found");
  });

  it('should return a 400 status code and a message for empty name', async () => {
    const userId = 1; // Replace with an existing user ID

    // Mock the userDetail.findOne method
    userDetail.findOne = jest.fn(() => Promise.resolve({ id: userId })); // Simulate an existing user

    const req = {
      params: { id: userId },
      body: {
        name: '', // Empty name
        email: 'updated@example.com',
        phoneNumber: '9876543210',
      },
    };

    await updateUser(req, res);

    expect(userDetail.findOne).toHaveBeenCalledWith({
      where: {
        id: userId
      }
    });

    expect(userDetail.update).not.toHaveBeenCalled(); // Update method should not be called
    expect(userDetail.findOne).not.toHaveBeenCalled(); // Second findOne should not be called

    expect(res.status).toHaveBeenCalledWith(400); // 400 (Bad Request)
    expect(res.json).toHaveBeenCalledWith("Name can't be empty");
  });

  it('should return a 400 status code and a message for empty email', async () => {
    const userId = 1; // Replace with an existing user ID

    // Mock the userDetail.findOne method
    userDetail.findOne = jest.fn(() => Promise.resolve({ id: userId })); // Simulate an existing user

    const req = {
      params: { id: userId },
      body: {
        name: 'Updated User',
        email: '', // Empty email
        phoneNumber: '9876543210',
      },
    };

    await updateUser(req, res);

    expect(userDetail.findOne).toHaveBeenCalledWith({
      where: {
        id: userId
      }
    });

    expect(userDetail.update).not.toHaveBeenCalled(); // Update method should not be called
    expect(userDetail.findOne).not.toHaveBeenCalled(); // Second findOne should not be called

    expect(res.status).toHaveBeenCalledWith(400); // 400 (Bad Request)
    expect(res.json).toHaveBeenCalledWith("Email can't be empty");
  });

  it('should return a 400 status code and a message for an invalid phone number', async () => {
    const userId = 1; // Replace with an existing user ID

    // Mock the userDetail.findOne method
    userDetail.findOne = jest.fn(() => Promise.resolve({ id: userId })); // Simulate an existing user

    const req = {
      params: { id: userId },
      body: {
        name: 'Updated User',
        email: 'updated@example.com',
        phoneNumber: '123', // Invalid phone number
      },
    };

    await updateUser(req, res);

    expect(userDetail.findOne).toHaveBeenCalledWith({
      where: {
        id: userId
      }
    });

    expect(userDetail.update).not.toHaveBeenCalled(); // Update method should not be called
    expect(userDetail.findOne).not.toHaveBeenCalled(); // Second findOne should not be called

    expect(res.status).toHaveBeenCalledWith(400); // 400 (Bad Request)
    expect(res.json).toHaveBeenCalledWith("Phone Number must be of 10 digits");
  });

  it('should handle errors and return a 500 status code for internal server error', async () => {
    const userId = 1; // Replace with an existing user ID

    // Mock the userDetail.findOne to simulate an error
    userDetail.findOne = jest.fn(() => {
      throw new Error('Database Error');
    });

    const req = {
      params: { id: userId },
      body: {
        name: 'Updated User',
        email: 'updated@example.com',
        phoneNumber: '9876543210',
      },
    };

    await updateUser(req, res);

    expect(userDetail.findOne).toHaveBeenCalledWith({
      where: {
        id: userId
      }
    });

    expect(userDetail.update).not.toHaveBeenCalled(); // Update method should not be called
    expect(userDetail.findOne).not.toHaveBeenCalled(); // Second findOne should not be called

    expect(res.status).toHaveBeenCalledWith(500); // 500 (Internal Server Error)
    expect(res.json).toHaveBeenCalledWith("Internal Server Error");
  });
});
