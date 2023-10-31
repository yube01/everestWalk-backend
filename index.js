const express = require("express")
const db = require("./models")

const { Person } = require("./models")

const app = express()


app.get('/select',(req,res)=>{
    res.send('select')
})
app.get('/insert',(req,res)=>{
    Person.create({
        firstName:"Yube",
        age:20,
    }).catch((err)=>{
        if(err){
            console.log(err)
        }
    })
    res.send("Data inserted")
})
app.get('/delete',(req,res)=>{
    res.send('delete')
})



db.sequelize.sync().then((req)=>{

    app.listen(9000,()=>{
        console.log("Server Started")
    })

})

