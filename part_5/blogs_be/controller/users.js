const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(password.length<4){
    response.status(400).json({error: "password is too short"})
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.status(201).json(savedUser)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs',{title:1, author:1, id:1, url:1})
  response.json(users)
})


usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs',{title:1, author:1, id:1, url:1})
  if (user) {
    response.json(user)
  } else {
    response.status(404).json({error:"user not found"})
  }
})


module.exports = usersRouter