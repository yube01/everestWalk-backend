const { userDetail } = require("../models");

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);

    // Check if the user with the given ID exists
    const isAvailable = await userDetail.findOne({
      where: {
        id: userId
      }
    });
    
    if (isAvailable === null) {
      return res.status(404).json("User not found"); // Corrected status code to 404 (Not Found)
    }

    console.log("User data");

    const responseData = {
      id: isAvailable.id,
      name: isAvailable.name,
      email: isAvailable.email,
      phoneNumber: isAvailable.phoneNumber
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error"); // Added a 500 status code for internal server error
  }
}

module.exports = getUser;
