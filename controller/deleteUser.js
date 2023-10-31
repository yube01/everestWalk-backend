const {userDetail} = require("../models")

const deleteUser = async(req,res)=>{

   

    try {
    
        
        const userId = req.params.id
        console.log(userId)

        const isAvailable = await userDetail.findOne({
            where:{
                id:userId
            }
        })
        if(isAvailable === null) return res.status(401).json("User not found")

        const result = await userDetail.destroy({
            where:{
                id:userId
            }
        })
        console.log("user deleted")
        res.status(200).json("deleted")
    } catch (error) {
        console.log(error)
        
    }
    
}

module.exports = deleteUser