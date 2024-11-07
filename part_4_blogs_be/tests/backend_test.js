const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')


const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    console.log("reset database")
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    const passwordHash = await bcrypt.hash("aaaa",10)
    const user = new User({
        username:"aaaa",
        name:"aaa",
        blogs:[],
        passwordHash: passwordHash
    })
    await user.save()
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test("The correct amount of blog entries is returned", async() => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test("the identifier field is called 'id'", async () => {
    const response = await api.get('/api/blogs')
    
    assert(response.body[0].hasOwnProperty("id"))
})

test("using post creates a new blog entry", async () => {
    const newBlog ={
        title: "Javascript is a mess",
        author: "Bill Clinton",
        url: "http://blogsbuenones.com",
        likes: 1
        }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogs = (await api.get('/api/blogs')).body
    assert.strictEqual(blogs.length, helper.initialBlogs.length+1)
})

test("posting blog with no likes property, sets default to 0", async () => {
    const newBlog ={
        title: "Javascript is a mess no likes",
        author: "Bill Clinton",
        url: "http://blogsbuenones.com",
        }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogs = (await api.get('/api/blogs')).body
    assert.strictEqual(blogs[blogs.length-1].likes, 0)
})

test("sending a blog with no title is not posted", async () => {
    const newBlog ={
        author: "va sin titulo",
        url: "http://blogsbuenones.com",
        }
    
    const blogsBefore = (await api.get('/api/blogs')).body
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAfter = (await api.get('/api/blogs')).body
    assert.strictEqual(blogsBefore.length, blogsAfter.length)

})

test("delete element from database", async () => {
    const blogsBefore = (await api.get('/api/blogs')).body
    const blogToDelete = blogsBefore[0]
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    const blogsAfter = (await api.get('/api/blogs')).body

    assert.strictEqual(blogsBefore.length, blogsAfter.length+1)

})

test("update number of likes in an existing blog entry", async () => {
    const blogsBefore = (await api.get('/api/blogs')).body
    const blogToUpdate = blogsBefore[0]
    blogToUpdate.likes = 120000

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
    
    const blogsAfter = (await api.get('/api/blogs')).body

    assert.strictEqual(blogsAfter[0].likes, 120000)
    

})

test("get users from server, correct number", async () => {
    await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const users = (await api.get('/api/users')).body

    assert.strictEqual(users.length, 1)
})

test("adding a user with correct parameters", async () => {
    const newUserBody = {
        user: "bbbb",
        username: "bbbb",
        password: "bbbb"
    }

    const usersBefore = (await api.get('/api/users')).body

    await api
    .post('/api/users')
    .send(newUserBody)

    const usersAfter = (await api.get('/api/users')).body
    assert.strictEqual(usersBefore.length+1, usersAfter.length)
})

test("adding a user with incorrect parameters is not added", async () => {
    const newUserBody = {
        user: "c",
        username: "c",
        password: "c"
    }

    const usersBefore = (await api.get('/api/users')).body

    await api
    .post('/api/users')
    .send(newUserBody)

    const usersAfter = (await api.get('/api/users')).body
    assert.strictEqual(usersBefore.length, usersAfter.length)

})



after(async () => {
    console.log("close mongoose connection")
    await mongoose.connection.close()
})