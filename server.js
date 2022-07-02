const express = require('express')
const User = require("./models/User");
const app= express()
const mongoose=require('mongoose')

const port=5000
app.listen(port,(err)=>{
    err ? console.log(err) : console.log('server is running on port 5000')
})

// connect to db
const path = require('path')
require('dotenv').config({ path: './config/.env' });
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
    err ? console.log(err) : console.log('database is connected')
})

//parse the data
app.use(express.json())

//GET :  RETURN ALL USERS 
app.get('/users',(req,res)=>{
    User.find( {}, (err,data)=>{
        err? console.log(err) : res.send(data)
    })
})

//  POST :  ADD A NEW USER TO THE DATABASE 
app.post('/newUser',(req,res)=>{
    let newUser= new User(req.body)
    newUser.save((err,data)=>{
        err? console.log(err) : res.send ('user is created')
    })
})

// PUT : EDIT A USER BY ID 
app.put('/user/:id',(req,res)=>{
    User.findOneAndUpdate({_id: req.params.id}, {...req.body }, {new:true})
    .then(user=>{
        user.save().then(user=>res.send(user))
    })
})

// DELETE : REMOVE A USER BY ID 
app.delete('/removeUser/:id',(req,res)=>{
    User.findOneAndRemove({_id:req.params.id},(err,data)=>{
        err? console.log(err) : res.send('user is removed')
    })
})