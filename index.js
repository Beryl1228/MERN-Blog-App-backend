const dotenv = require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors') //connect front and back end
const app = express()
const authController = require('./controllers/authController')
const blogController = require('./controllers/blogController')

//conncect db
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("Database Connected"))
.catch((error)=> console.log("Database not connected",error))



//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//routes
app.use('/auth', authController)
app.use('/blog', blogController)

// Server Listener
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));