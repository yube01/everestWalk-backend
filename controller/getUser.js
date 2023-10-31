const {userDetail} = require("../models")
const  getUser = async(req,res)=>{

    try {
    
        
        const userId = req.params.id
        console.log(userId)

        const isAvailable = await userDetail.findOne({
            where:{
                id:userId
            }
        })
        if(isAvailable === null) return res.status(401).json("User not found")

        
        console.log("user data")
        const responseData = {
            id: isAvailable.id,
            name: isAvailable.name,
            email: isAvailable.email,
            phoneNumber: isAvailable.phoneNumber
        };
        res.status(200).json(responseData)
    } catch (error) {
        console.log(error)
        
    }
    
}

module.exports = getUser