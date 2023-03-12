const express= require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app= express()

dotenv.config({path:'./config.env'});
const DB=process.env.DATABASE;
const PORT=process.env.PORT;

// const User= require('./models/userSchema');
app.use(express.json());
app.use(require('./routers/auth'));

mongoose.connect(DB,{useNewUrlParser:true}).then(()=>{
    console.log('connection hogya');
}).catch((err)=> console.log('connection nhi hua'));


app.get('/',(req,res)=>{
    res.send("hii")
});


app.listen(PORT,()=>{
    console.log('server chal rha hai')
})