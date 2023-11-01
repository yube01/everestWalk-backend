const db = require('../models'); // Import your database module
const sequelize = db.sequelize;

describe('Database Connection', () => {
  it('Should connect to the database successfully', async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
});
