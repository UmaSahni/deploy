const express = require("express")
const { UserModel } = require("../model/user.model")
const jwt = require("jsonwebtoken")
const userRoute = express.Router()
const bcrypt = require('bcrypt');

userRoute.post("/reg", async(req, res)=>{
   const {email, password, name, age} = req.body
   bcrypt.hash(password, 3,async function(err, hash) {
    // Store hash in your password DB.
    if(err){
        res.json({err:err})
    }
    else{
        const user = new UserModel({email, name, age, password:hash})
        await user.save()
        res.json({msg:"A new user has been added"})
    }
    });
})

userRoute.post("/login", async(req, res)=>{
  const {email, password} = req.body
  try {
    const user = await UserModel.findOne({email})
     if(user){
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
                res.json({msg:"The user is Logged in", token})
            }
            else{
                res.json({err:"Wrong Credentials, please try again!"})
            }
    });           
    }
    else{
        res.json({msg:"Wrong Credentials"})
    }
  } 
  catch (error) {
    res.json({err:error})
  }
  
})

module.exports = {
    userRoute
}