const mongoose = require("mongoose")

const userSchema = {
    email:String,
    password:String,
    name:String,
    companies:Array,
    phone: String,
    activities:Array,
    loggedIn:Boolean
}

const User = mongoose.model("User", userSchema);
module.exports = User