const mongoose = require("mongoose");
const byrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchems = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    phone:{
        type: Number,
        require:true
    },
    work:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    },
    cpassword:{
        type: String,
        require:true
    },
    tokens:[
        {
            token:{
                type: String,
                require:true
            }
        }
    ]
})


    // we are hashing the passwork
    userSchems.pre("save", async function(next){
        if(this.isModified('password')){
            this.password = await byrypt.hash(this.password, 12);
            this.cpassword = await byrypt.hash(this.cpassword, 12);
        }
        next();
    })

    // we are generate token
    userSchems.methods.generateAuthToken = async function(){
        try {
            let myToken  = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
            this.tokens = this.tokens.concat({token:myToken})
            await this.save();
            return myToken;
        } catch (error) {
            console.log(error)
        }
    }

const User = mongoose.model('USER', userSchems);
module.exports = User;