const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
require("express-async-errors")
const jwt = require('jsonwebtoken')
require('dotenv').config()



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1,name:1, id:1})
    response.json(blogs)
  })

blogsRouter.get('/:id', async(request,response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {username:1,name:1, id:1})
  if (blog){
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'invalid token (from router)'})
  // }
  const user = request.user
  if(!user) {
    return response.status(401).json({error: "invalid token or missing user"})
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user,
    url: body.url,
    likes: body.likes
  })

  if ( blog.title === undefined || blog.url === undefined ){
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
  }
  

})

blogsRouter.delete('/:id', async(request, response) => {
  
  const blogToDelete = await Blog.findById(request.params.id)
  const user = request.user
  if(!user) {
    return response.status(401).json({error: "invalid token or missing user"})
  }

  if (user.id!==blogToDelete.user.toString()) {
    return response.status(401).json({ error: 'you are not allowed to delete this post'})
  }

  if (blogToDelete) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).json(blogToDelete)
  } else {
    response.status(404).json({error: "id not found"})
  }
})

blogsRouter.delete('/', async(request, response)=> {
  await Blog.deleteMany({})
})

blogsRouter.put('/:id', async (request,response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes: 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
  response.json(updatedBlog)
  
})

module.exports = blogsRouter
