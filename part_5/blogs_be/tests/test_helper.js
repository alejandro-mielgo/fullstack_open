const Blog = require('../models/blog')

const initialBlogs = [
    {
    title: "Pointers in C",
    author: "George Lucas",
    url: "http://blogsbuenones.com",
    likes: 25
    },
    {
    title: "La Guía del buen yantar",
    author: "PechitosMcTetis",
    url: "http://ajarenauer.com/blogs",
    likes: 2,
    __v: 0
    },
    {
    title: "Aserejé ja ",
    author: "PechitosMcTetis",
    url: "http://ajarenauer.com/blogs",
    likes: 4,
    __v: 0
    },
    {
    title: "Aserejé ja de jé ",
    author: "PechitosMcTetis",
    url: "http://ajarenauer.com/blogs",
    likes: 4,
    __v: 0
    }
]


module.exports = {
    initialBlogs,
}