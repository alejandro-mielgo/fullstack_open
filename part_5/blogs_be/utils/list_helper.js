const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogPosts) => {
    return blogPosts.reduce((sum,blogPost) => sum + blogPost.likes,0)
}

const favoriteBlog = (blogPosts) =>{
    //find max of values
    let mostLikes = 0
    blogPosts.map((blogPost) =>{
        mostLikes = Math.max(mostLikes, blogPost.likes)
    })

    return blogPosts.filter(blogPost => blogPost.likes === mostLikes)[0]
}


const mostBlogs = (blogPosts) => {
   
    const authorNames = blogPosts.map(blogPost => blogPost.author)
    const counter = {}
    authorNames.forEach(author => {
        if(counter[author]){
            counter[author] = counter[author]+1
        }else{
            counter[author]=1
        }
    });
 
    const mostBlogs = Math.max(...Object.values(counter))
    const mostBlogsAuthor = Object.keys(counter).find(key => counter[key]===mostBlogs)
    
    return {
        author: mostBlogsAuthor,
        blogs: mostBlogs
    }
}

const mostLikes = (blogPosts) => {
    const likes = {}
    blogPosts.forEach(blogPost => {
        if(likes[blogPost.author]){
            likes[blogPost.author]+= blogPost.likes  
        } else {
            likes[blogPost.author] = blogPost.likes
        }
    })
    const mostLikes = Math.max(...Object.values(likes))
    const mostlikesAuthor = Object.keys(likes).find(key => likes[key]===mostLikes)
    console.log(mostLikes,mostlikesAuthor)
    return {
        author: mostlikesAuthor,
        likes: mostLikes
    }
    
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}