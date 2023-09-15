const blogController = require('express').Router()
const Blog = require('../models/Blog')
const verifyToken = require('../middlewares/verifyToken')
// const bcrypt = require('bcrypt') //hasing password


blogController.get('/getAll', async(req, res)=>{ 
    try { 
        // Attempt to find all blogs in the database
        const blogs = await Blog.find({}).populate('userId','-password')

        // If successful, return the blogs as a JSON response with a status code of 200 (OK)
        return res.status(200).json(blogs)
    } catch (error) { 
        // If an error occurs during the process, handle it here
        return res.status(500).json({error: error.message })
    } 
})

blogController.get('/find/:id', async(req,res)=>{
    try {
        const blog = await Blog.findById(req.params.id).populate('userId','-password')
        blog.views += 1
        await blog.save()
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json({error: error.message })
    }
})

blogController.get('/featured', async(req, res)=>{
    try {
        const blog = await Blog.find({featured:true}).populate('userId','-password').limit(3)
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json({error: error.message })
    }
})

blogController.post('/', verifyToken, async(req, res)=>{
    try {
        const blog = await Blog.create({...req.body, userId: req.user.id })
        return res.status(201).json(blog)
    } catch (error) {
        return res.status(500).json({error: error.message })
    }
})


blogController.put('/updateBlog/:id', verifyToken, async(req, res)=>{
    try {
        const blog = await Blog.findById(req.params.id)
        console.log(blog.userId)
        console.log(req.user.id);
        if(blog.userId.toString() !== req.user.id){
            throw new Error("Unauthorized: You are only permitted to update your own posts.")
        }
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        .populate('userId','-password')

        return res.status(200).json(updatedBlog)
    } catch (error) {
        return res.status(500).json({error: error.message })
    }
})

blogController.put('/likeBlog/:id', verifyToken, async(req, res)=>{
    try {
        const blog = await Blog.findById(req.params.id)
        if(blog.likes.includes(req.user.id)){
            blog.likes = blog.likes.filter((userId) => userId !== req.user.id)
 
        await blog.save()
        return res.status(200).json({msg: 'You have unliked the blog'})
    } else {
        blog.likes.push(req.user.id)
        await blog.save()
        return res.status(200).json({msg: 'liked this blog'})
    }
} catch (error) {
        return res.status(500).json({error: error.message })
    }
})

blogController.delete('/deleteBlog/:id', verifyToken, async(req, res)=>{
    try {
        const blog = await Blog.findById(req.params.id)
        if(blog.userId.toString() !== req.user.id){
            throw new Error("You can only delete your own blog")
        }
        await Blog.findByIdAndDelete(req.params.id)
        return res.status(200).json({msg: 'Successfully deleted this blog'})
    } catch (error) {
        return res.status(500).json({error: error.message })
    }
})

module.exports = blogController;