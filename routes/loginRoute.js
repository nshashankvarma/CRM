const express = require("express")
const router = express.Router()
const User = require("../src/models/userModel")
const newuser = {
    email: '',
    password: ''
}
router.route("/signup").post((req, res) => {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const loggedIn = req.body.loggedIn
    const companies = []
    const newUser = new User({
        email,
        password,
        name,
        companies,
        loggedIn
    });
    newuser.email = newUser.email
    newuser.password = newUser.password
    User.findOne({ email: newUser.email }, (err, docs) => {
        if (!docs) {
            newUser.save()
        }
        else {
            console.log("User already exists")
        }
    })

})
router.route("/login").post((req, res) => {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const companies = req.body.companies
    const loggedIn = req.body.loggedIn
    const newUser = new User({
        email,
        password,
        name,
        companies,
        loggedIn
    });
    newuser.email = newUser.email
    newuser.password = newUser.password
})


router.route("/home").get((req, res) => {
    User.findOne({ email: newuser.email, password: newuser.password }, (err, docs) => {

        if (err)
            console.log("No User found");
        else {
            return res.status(200).json({ status: 200, docs })
        }
    })
})

module.exports = router