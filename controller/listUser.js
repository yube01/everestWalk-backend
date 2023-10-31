const {userDetail} = require("../models")
const listUser = async(req,res)=>{

    try {

        const result = await userDetail.findAll()
        
        if(result.length === 0) return res.status(201).json("List is empty")
        res.status(200).json(result)
        
    } catch (error) {
        
    }
    
}

module.exports = listUser