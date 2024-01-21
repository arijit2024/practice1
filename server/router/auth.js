const express = require("express");
const router = express.Router();
const byrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("../database/conn")
const User = require("../model/userSchema");

router.get("/", (req, res) => {
    res.send("This is home router js");
})


router.post("/register", async (req, res) => {
    // console.log(req.body);
    // res.json({message:req.body})

    // ------------

    const { name, email, phone, work, password, cpassword } = req.body;
    // console.log(name)
    // console.log(email)

    // validation
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "error" })
    }

    // ---------Using promises--------->

    // find database data 
    // User.findOne({ email : email})
    // .then((userExists) => {
    //     if (userExists) {
    //         return res.status(422).json({ error: "Email Already Exists" });
    //     }
    // })

    // Data save database
    // const user = new User({name,email,phone,work,password,cpassword});
    // user.save().then(()=>{
    //     res.status(201).json({message:"user register successfuly"});
    // }).catch((err)=>{req.status(500).json({error:"fails to Register"})})

    // ---------Using Async-Await-------->

    try {
        // find database data 
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(422).json({ error: "Email Already Exists" })
        }

        // Data save database
        const user = new User({ name,email,phone,work,password,cpassword });
        const userRegister = await user.save();

        if (userRegister) {
            res.status(201).json({ message: "User register successfuly" })
        } else {
            res.status(422).json({ message: "Faild to register" })
        }

    } catch (error) {
        console.log(error)
    }
});

// get data database
router.get("/alluser", async (req, res) => {
    try {
        const response = await User.find();
        res.json(response)
    } catch (error) {
        console.log(error)
    }
})

// update
router.put("/update/:id", async (req, res) => {
    try {
        const response = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})


// delete
router.delete("/delete/:id", async (req, res) => {
    try {
        const response = await User.deleteOne({ _id: req.params.id });
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error);
    }
})


// login
router.post("/signin", async (req, res) => {
    // console.log(req.body);
    // res.json({message:"good"})

    try {
        const { email, password } = req.body;
        // check passsword and email are emty
        if (!email || !password) {
            return res.status(400).json({ message: "erros" });
        }

        // find email
        const userlogin = await User.findOne({ email: email })

        if (userlogin) {
            // console.log(userlogin);
            const inMatch = await byrypt.compare(password, userlogin.password);
            // token
            const token = await userlogin.generateAuthToken();

            if (!inMatch) {
                res.status(404).json({ error: "invalid password" })
            } else {
                res.json({ message: "User signin successfully" });
            }
        } else {
            res.status(404).json({ error: "Invalid email" })
        }

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;