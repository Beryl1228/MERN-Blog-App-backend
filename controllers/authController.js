const authController = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt') //hasing password
const jwt = require('jsonwebtoken'); //authorization



authController.post('/register', async(req,res)=>{
    try {
        const isExisting = await User.findOne({email:req.body.email})
        if(isExisting){
            throw new Error('this email has been already registered with another account, please try a different email')
        }
        //if there's a valid email, then hash paaword
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        //then create new user 
        const newUser = await User.create({...req.body, password:hashedPassword})

        const {password, ...others} = newUser._doc

        const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn:'5h'})
   
        return res.status(201).json ({user: others, token})
        
    } catch (error) {
        return res.status(500).json({error: error.message })
    }
})

authController.post('/login', async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            throw new Error("Invalid Credential")
        }
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if(!comparePassword){
            throw new Error("Invalid Credential")
        }
        const {password, ...others} = user._doc
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'5h'})
        
        return res.status(200).json ({user: others, token})
    } catch (error) {
        return res.status(500).json({error: error.message } )
    }
})

module.exports = authController