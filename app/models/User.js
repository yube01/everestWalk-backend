module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define("userDetail",
    {
        name: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
            
        },
        email: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        phoneNumber: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }

    },
  

    )
    return User
}