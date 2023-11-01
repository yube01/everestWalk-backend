const { userDetail } = require("../models");

const updateUser = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const userId = req.params.id;

    // Check if the user with the given ID exists
    const isAvailable = await userDetail.findOne({
      where: {
        id: userId
      }
    });

    if (isAvailable === null) {
      return res.status(404).json("User not found"); // Corrected status code to 404 (Not Found)
    }

    if (name.length === 0) {
      return res.status(400).json("Name can't be empty"); // Corrected status code to 400 (Bad Request)
    }

    if (email.length === 0) {
      return res.status(400).json("Email can't be empty"); // Corrected status code to 400 (Bad Request)
    }

    if (phoneNumber.length !== 10) {
      return res.status(400).json("Phone Number must be of 10 digits"); // Corrected status code to 400 (Bad Request)
    }

    // Update the user data
    const result = await userDetail.update(
      {
        name,
        email,
        phoneNumber
      },
      {
        where: {
          id: userId
        }
      }
    );

    console.log("User data updated");

    // Fetch the updated user data
    const userUpdate = await userDetail.findOne({
      where: {
        id: userId
      }
    });

    const responseData = {
      id: userUpdate.id,
      name: userUpdate.name,
      email: userUpdate.email,
      phoneNumber: userUpdate.phoneNumber
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error"); // Added a 500 status code for internal server error
  }
}

module.exports = updateUser;
