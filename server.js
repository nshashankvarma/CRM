const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
app.use(cors());
app.use(express.json())

mongoose.connect("mongodb+srv://Shashank:shashank@cluster0.twasi.mongodb.net/UsersDB")

app.use("/", require("./routes/loginRoute"))

app.listen(3001, function(){
    console.log("Express as 3001")
})