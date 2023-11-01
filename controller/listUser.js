const { userDetail } = require("../models");

const listUser = async (req, res) => {
  try {
    // Retrieve a list of users
    const result = await userDetail.findAll();

    if (result.length === 0) {
      return res.status(204).json("List is empty"); // Corrected status code to 204 (No Content)
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error"); // Added a 500 status code for internal server error
  }
}

module.exports = listUser;
