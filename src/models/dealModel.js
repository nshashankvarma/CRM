const mongoose = require("mongoose")

const dealSchema = {
    title:String,
    desc:String,
    partner1:String,
    partner2:String,
    email1:String,
    email2:String,
    priority:String
}

const Deal = mongoose.model("Deal", dealSchema);
module.exports = Deal