const mongoose = require('mongoose');
const userschema= new mongoose.Schema({
    username:{
        type :String,
        required : true
        },
    email:{
        type :String,
        required : true,
        unique : true
        },
    password:{
        type :String,
        required : true
        },
    isAdmin:{
        type :Boolean,
        required:true,
        default:false
        }
});
module.exports=mongoose.model('User',userschema);
