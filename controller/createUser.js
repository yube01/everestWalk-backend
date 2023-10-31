const { userDetail } = require("../models")

const createUser = async(req,res)=>{

    
    try {
        const {name,email,phoneNumber} = req.body
        if(name.length === 0) return res.status(401).json("Name can't be empty")

        if(email.length === 0) return res.status(401).json("Email can't be empty")
        
        if(phoneNumber.length !== 10) return res.status(401).json("Phone Number must be of 10 digits")
        


        const result = await userDetail.create({name,email,phoneNumber})
        console.log("user data inserted")
        res.status(200).json("Inserted")
    } catch (error) {
        console.log(error)
        
    }
    
}

module.exports = createUser