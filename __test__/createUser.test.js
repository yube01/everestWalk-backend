const createUser = require('../controller/createUser');
const db = require('../models'); // Import your database module
const sequelize = db.sequelize;

// Mock userDetail and Express response object
const userDetail = require('../models').userDetail; // Replace with the path to your userDetail model
const req = {
  body: {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phoneNumber: '1234567890',
  },
};
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

beforeAll(async()=>{
  await sequelize.authenticate();
})

afterAll(async()=>{
  await sequelize.close();

})

describe('createUser', () => {
  it('should create a user with valid data', async () => {
    // Mock the userDetail.create method
    userDetail.create = jest.fn(() => Promise.resolve({}));

    await createUser(req, res);

    expect(userDetail.create).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
    });

    expect(res.status).toHaveBeenCalledWith(201); // 201 (Created)
    expect(res.json).toHaveBeenCalledWith('User data inserted successfully');
  });

  it('should return a 400 status code and error message for empty name', async () => {
    req.body.name = ''; // Set name to an empty string
   
    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400); // 400 (Bad Request)
    expect(res.json).toHaveBeenCalledWith("Name can't be empty");
  });

  it('should return a 400 status code and error message for empty email', async () => {
    req.body.email = ''; // Set email to an empty string
    req.body.name='test'
    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400); // 400 (Bad Request)
    expect(res.json).toHaveBeenCalledWith("Email can't be empty");
  });

  it('should return a 400 status code and error message for invalid phoneNumber', async () => {
    req.body.phoneNumber = '123'; // Set phoneNumber to an invalid value
    req.body.name='test'
    req.body.email='test'
    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400); // 400 (Bad Request)
    expect(res.json).toHaveBeenCalledWith("Phone Number must be of 10 digits");
  });

//   it('should handle errors and return a 500 status code for internal server error', async () => {
//     // Mock userDetail.create to simulate an error
//     userDetail.create = jest.fn(() => {
//       throw new Error('Database Error');
//     });

//     await createUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(500); // 500 (Internal Server Error)
//     expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
//   });
 });
