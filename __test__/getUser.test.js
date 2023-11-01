const getUser = require('../controller/getUser'); // Replace with the actual path to your getUser module

// Mock userDetail and Express response object
const userDetail = require('../models').userDetail; // Replace with the path to your userDetail model
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

describe('getUser', () => {
//   it('should return user data when the user exists', async () => {
//     const userId = 1; // Replace with an existing user ID

//     // Mock the userDetail.findOne method
//     userDetail.findOne = jest.fn(() => Promise.resolve({ id: userId })); // Simulate an existing user

//     await getUser({ params: { id: userId } }, res);

//     expect(userDetail.findOne).toHaveBeenCalledWith({
//       where: {
//         id: userId
//       }
//     });
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       id: userId,
//       name: 'User1', // Replace with expected data
//       email: 'user1@example.com', // Replace with expected data
//       phoneNumber: '1234567890' // Replace with expected data
//     });
//   });

  it('should return a 404 status code and a message when the user does not exist', async () => {
    const userId = 1; // Replace with a non-existing user ID

    // Mock the userDetail.findOne to simulate a non-existing user
    userDetail.findOne = jest.fn(() => Promise.resolve(null));

    await getUser({ params: { id: userId } }, res);

    expect(userDetail.findOne).toHaveBeenCalledWith({
      where: {
        id: userId
      }
    });
    expect(res.status).toHaveBeenCalledWith(404); // 404 (Not Found)
    expect(res.json).toHaveBeenCalledWith("User not found");
  });

  it('should handle errors and return a 500 status code for internal server error', async () => {
    const userId = 1; // Replace with an existing user ID

    // Mock the userDetail.findOne to simulate an error
    userDetail.findOne = jest.fn(() => {
      throw new Error('Database Error');
    });

    await getUser({ params: { id: userId } }, res);

    expect(userDetail.findOne).toHaveBeenCalledWith({
      where: {
        id: userId
      }
    });
    expect(res.status).toHaveBeenCalledWith(500); // 500 (Internal Server Error)
    expect(res.json).toHaveBeenCalledWith("Internal Server Error");
  });
});
