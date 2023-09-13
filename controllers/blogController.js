const blogController = require('express').Router()
const Blog = require('../models/Blog')
const verifyToken = require('../middlewares/')
// const bcrypt = require('bcrypt') //hasing password

