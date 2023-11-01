const { userDetail } = require("../models");

const createUser = async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;

        // Validate input data
        if (name.length === 0) {
            return res.status(400).json("Name can't be empty");
        }

        if (email.length === 0) {
            return res.status(400).json("Email can't be empty");
        }

        if (phoneNumber.length !== 10) {
            return res.status(400).json("Phone Number must be of 10 digits");
        }

        // Create a new user
        const result = await userDetail.create({ name, email, phoneNumber });

        console.log("User data inserted");

        // Respond with a success message and status code 201 (Created)
        res.status(201).json("User data inserted successfully");
    } catch (error) {
        console.error(error);

        // Handle errors with an appropriate status code (e.g., 500 for internal server error)
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = createUser;
