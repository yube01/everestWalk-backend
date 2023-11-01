const { userDetail } = require("../models");

const deleteUser = async (req, res) => {
  try {
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

    // Delete the user with the given ID
    await userDetail.destroy({
      where: {
        id: userId
      }
    });

    
    res.status(200).json(`UserId ${userId} deleted`);
  } catch (error) {
    
    res.status(500).json("Internal Server Error"); // Added a 500 status code for internal server error
  }
}

module.exports = deleteUser;
