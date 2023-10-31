const{userDetail} = require("../models")
const updateUser = async(req,res)=>{

    try {
        const {name,email,phoneNumber} = req.body
        const userId = req.params.id
        if(name.length === 0) return res.status(401).json("Name can't be empty")

        if(email.length === 0) return res.status(401).json("Email can't be empty")
        
        if(phoneNumber.length !== 10) return res.status(401).json("Phone Number must be of 10 digits")
        


        const result = await userDetail.update({
            name:name,
            email:email,
            phoneNumber:phoneNumber
        },{
            where:{
                id:userId
            }
        })

      
        console.log("user data updated")
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        
    }
    
}

module.exports = updateUser