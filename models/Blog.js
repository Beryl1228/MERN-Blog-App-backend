const mongoose = require('mongoose');
const {Schema } = mongoose 

const BlogSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
    title:{
        type:String,
        unique:true,
        min:4,
    },
    desc: {
        type:String,
        required:true, 
        min:12, 
    },
    photo:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    },
    views:{
        type:Number,
        default:0
    },
    likes:{
        type:[String],
        default:[]
    }
}, {timestamps: true})


const userModel = mongoose.model('Blog', BlogSchema);

module.exports = BlogSchema;