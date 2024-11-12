const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controller/blogs')
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')


const config = require('./utils/config')
require('express-async-errors')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


logger.info("connecting to mongo DB at ", config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
    .then(result=>{
        logger.info("connected to mongoDB")
    })
    .catch(error =>{
        logger.info("error connecting to mongo db", error.message)
    })


//Middelware
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
//app.use(middleware.userExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter )   //El orden importa por que esto lo hizo un loco
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controller/testing')
    app.use('/api/testing', testingRouter)
  }


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports=app