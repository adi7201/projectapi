const express = require('express');
const User = require('../models/userSchema');
const routers =express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

 

routers.post('/register',async(req,res)=>{
    const{name,regNo,phoneNo, roomNumber,  branch, email, password }=req.body;
    if(!name || !regNo|| !phoneNo|| !roomNumber || !branch|| !email|| !password){
        return res.status(422).json({error:"plz fill the field properly"});
    }
    try{
        const userExist=await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"email already exist"});
        }
        const user=new User({name,regNo,phoneNo, roomNumber,  branch, email, password});

        await user.save();
        res.status(201).json({message:"user registered"});
    }catch(err){
        console.log(err);
    }
});




routers.post('/login',async(req,res)=>{
    try{
        let token;
        const{email, password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"plz filled the data"})
        }
        const userLogin = await User.findOne({email:email});
        
        // console.log(userLogin);
        if(userLogin){
            const isMatch=await bcrypt.compare(password, userLogin.password);


            token=await userLogin.generateAuthToken();
            console.log(token);

        res.cookie("jwtoken",token,{
            expires:new Date(Date.now() +25892000000),
            httpOnly:true
        });

        if(!isMatch){
            res.status(400).json({error:"invalid credential pass"});
        } else{
            res.json({message:"logined successfully"});
        }
        }else{
            res.status(400).json({error:"invalid credential"})
        }
        
    }catch(err){
        console.log(err);}
}) 


module.exports=routers;


 