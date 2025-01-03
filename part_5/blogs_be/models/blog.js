const mongoose = require('mongoose')
require('dotenv').config()

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is mandatory']
    },  
    author: {
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    url: {
        type: String,
        required: [true, "url is mandatory"]
    },
    likes: {
        type: Number,
        default: 0
    }
})

blogSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

  

module.exports = mongoose.model('Blog', blogSchema)  