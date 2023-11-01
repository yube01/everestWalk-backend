const express = require("express")
const db = require("./models")


const userRoute = require("./routes/userRoute")


const app = express()

app.use(express.json())

app.use("/user",userRoute)





db.sequelize.sync().then((req)=>{

    app.listen(9000,()=>{
        console.log("Server Started")
    })

}).catch((err)=>{
    console.log("Not connected")
})

