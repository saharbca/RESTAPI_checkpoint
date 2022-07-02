const mongoose =require('mongoose')
const schema = mongoose.Schema
const userSchema= new schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number,
})
module.exports= mongoose.model('user',userSchema)
