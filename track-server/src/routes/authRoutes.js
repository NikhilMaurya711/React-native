const express = require('express');
const mongoose =require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model("User")

const router = express.Router();

router.post('/signup',async (req,res) =>{
    const {email,password} = req.body;
    console.log(email,password);
    try{
    const user =User({email,password})
    await user.save(); 

    const token = jwt.sign({userId: user._id },'MY_KEY')
    res.send({token})
    // res.send('You made a Post Request');
    }
    catch(err){
        return res.status(422).send(err.message)
    }
})

router.post('/signin',async (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(422).send("Must Privide email or password"); 
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(422).send({error:"Invaild id or password"}); 
    }

    try{
    await user.comparepassword(password);
        const token = jwt.sign({userId: user._id}, "MY_KEY")
        res.send({token})
    } catch(err){
        return res.status(422).send({error:"Invaild id or password"});
    }


});
module.exports = router;