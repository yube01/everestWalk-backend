const deleteUser = require('../controller/deleteUser'); // Replace with the actual path to your deleteUser module

// Mock userDetail and Express response object
const userDetail = require('../models').userDetail; // Replace with the path to your userDetail model
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

describe('deleteUser', () => {
  it('should delete a user when the user exists', async () => {
    const userId = 1; // Replace with an existing user ID

    // Mock the userDetail.findOne and userDetail.destroy methods
    userDetail.findOne = jest.fn(() => Promise.resolve({ id: userId })); // Simulate an existing user
    userDetail.destroy = jest.fn(() => Promise.resolve());

    await deleteUser({ params: { id: userId } }, res);

    expect(userDetail.findOne).toHaveBeenCalledWith({
      where: {
        id: userId
      }
    });
    expect(userDetail.destroy).toHaveBeenCalledWith({
      where: {
        id: userId
      }
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(`UserId ${userId} deleted`);
  });

//   it('should return a 404 status code and a message when the user does not exist', async () => {
//     const userIds = 50; // Replace with a non-existing user ID

//     // Mock the userDetail.findOne to simulate a non-existing user
//     userDetail.findOne = jest.fn(() => Promise.resolve(null));

//     await deleteUser({ params: { id: userIds } }, res);

//     expect(userDetail.findOne).toHaveBeenCalledWith({
//       where: {
//         id: userIds
//       }
//     });
//     expect(userDetail.destroy).not.toHaveBeenCalled(); // Destroy method should not be called
//     expect(res.status).toHaveBeenCalledWith(404); // 404 (Not Found)
//     expect(res.json).toHaveBeenCalledWith("User not found");
//   });

//   it('should handle errors and return a 500 status code for internal server error', async () => {
//     const userId = 1; // Replace with an existing user ID

//     // Mock the userDetail.findOne to simulate an error
//     userDetail.findOne = jest.fn(() => {
//       throw new Error('Database Error');
//     });

//     await deleteUser({ params: { id: userId } }, res);

//     expect(userDetail.findOne).toHaveBeenCalledWith({
//       where: {
//         id: userId
//       }
//     });
//     expect(userDetail.destroy).not.toHaveBeenCalled(); // Destroy method should not be called
//     expect(res.status).toHaveBeenCalledWith(500); // 500 (Internal Server Error)
//     expect(res.json).toHaveBeenCalledWith("Internal Server Error");
//   });
});
