const express = require("express")
const router = express.Router()
const User = require("../src/models/userModel")
const Deal = require("../src/models/dealModel")

const newuser = {
    email: '',
    password: '',
    name:''
}
router.route("/signup").post((req, res) => {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const loggedIn = req.body.loggedIn
    const companies = []
    const phone = req.body.phone
    const company=''
    const newUser = new User({
        email,
        password,
        name,
        companies,
        phone,
        company,
        loggedIn
    });
    newuser.email = newUser.email
    newuser.password = newUser.password
    newuser.name = newUser.name
    User.findOne({ email: newUser.email }, (err, docs) => {
        if (!docs) {
            newUser.save()
        }
        else {
            console.log("User already exists")
        }
    })

})
router.route("/login").post(async (req, res) => {
    console.log(req.body)
    const email = req.body.email
    const password = req.body.password
    // const name = req.body.name
    // const companies = req.body.companies
    // const loggedIn = req.body.loggedIn    
    newuser.email = email
    newuser.password = password
    try{
       const user = await User.findOneAndUpdate({email:email, password:password},
        {$set:{loggedIn:true}}
        )
    }
    catch(e){
        console.log("Wrong password")
    }
})
router.route("/logout").post(async (req, res) => {
    const email = req.body.email
    console.log(email);
    // const name = req.body.name
    // const companies = req.body.companies
    // const loggedIn = req.body.loggedIn 
    try{
       const user = await User.findOneAndUpdate({email:email},
        {loggedIn:false}
        )
    }
    catch(e){
        throw e
    }
})


router.route("/home").get((req, res) => {
    // User.findOne({ email: newuser.email, password: newuser.password }, (err, docs) => {

    //     if (err)
    //         console.log("No User found");
    //     else {
    //         return res.status(200).json({ status: 200, docs })
    //     }
    // })
    try{
        const deals = Deal.find({$or:[{email1:newuser.email},{email2:newuser.email}]}, (err, docs)=>{
            if(!err){
                return res.status(200).json({ status: 200, docs })
                console.log(docs)
            }
        })
     }
     catch(e){
         throw e
     }
    

})
router.route("/homeuser").get((req, res) => {
    User.findOne({ email: newuser.email, password: newuser.password }, (err, docs) => {
        if (err)
            console.log("No User found");
        else {
            return res.status(200).json({ status: 200, docs })
        }
    })
})
router.route("/activity").get((req, res) => {
    User.findOne({ email: newuser.email}, (err, docs) => {
        if (err)
            console.log("No User found");
        else {
            return res.status(200).json({ status: 200, docs})
           //console.log(docs);
        }
    })
})


router.route("/profile/:name").get((req, res) => {
    const name = req.params.name
    // console.log("LMAO IM HERE")
    User.findOne({ name: name }, (err, docs) => {
        if (err)
            console.log("No User found");
        else {
            return res.status(200).json({ status: 200, docs})
        }
    })
})
router.route("/deletedeal").get((req, res)=>{
    const title = req.body.title
    Deal.findOneAndDelete({title:title}, (err)=>{
        if(err) console.log("Couldnt delete deal!!Try Again Later");
    })
})

router.route("/newdeal").post(async (req, res) => {
    const title = req.body.title
    const desc = req.body.desc
    const partner1 = req.body.partner
    const partner2 = req.body.name 
    const email1 = req.body.email
    const email2=''
    const priority = req.body.priority
    console.log(desc)
    const newDeal = new Deal({
        title,
        partner1,
        partner2,
        desc,
        email1,
        email2,
        priority
    });
    newDeal.save()
})
router.route("/newact").post(async (req, res)=>{
    const aname = req.body.name
    const desc = req.body.desc
    const activity = req.body.activity
    const newAct = {
        name:aname,
        desc:desc,
        activity:activity
    }
    var obj=[]
    try
    {User.findOne({email:newuser.email}, (err, doc)=>{
        obj = [...doc.activities, newAct]
        console.log(obj);
    })
    User.findOneAndUpdate({email:newuser.email}, {$set:{activities: obj}});
    console.log("New Activity!");}
    catch(e){throw e}
})

module.exports = router