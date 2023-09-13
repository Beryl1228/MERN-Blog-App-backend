const mongoose = require('mongoose');
const {Schema } = mongoose 

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password: {
        type:String,
        required:true, 
        min:6, 
    }
}, {timestamps: true})


const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;