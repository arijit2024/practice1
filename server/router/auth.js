const express = require("express");
const router = express.Router();

require("../database/conn")
const User = require("../model/userSchema");

router.get("/", (req,res)=>{
    res.send("This is home router js");
})


router.post("/register", (req,res) => {
    // console.log(req.body);
    // res.json({message:req.body})

    // ------------

    const {name,email,phone,work,password,cpassword} = req.body;
    console.log(name)
    console.log(email)

    // validation
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"error"})
    }


    // find database data 
    // User.findOne({ email })
    // .then((userExists) => {
    //     if (userExists) {
    //         return res.status(422).json({ error: "Email Already Exists" });
    //     }
    // })

    // Data save database
    const  user = new User({name,email,phone,work,password,cpassword});
    user.save().then(()=>{
        res.status(201).json({message:"user register successfuly"});
    }).catch((err)=>{req.status(500).json({message:"fails to Register"})})

});




module.exports = router;