const mongoose = require("mongoose")

const companySchema = {
    name:String,
    owner:String
}

const Company = mongoose.model("Company", companySchema);
module.exports = Company