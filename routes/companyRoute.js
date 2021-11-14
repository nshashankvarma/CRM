const express = require("express")
const router = express.Router()
const Company = require("../src/models/companyModel")
const newCompany = {
    email: '',
    password: ''
}