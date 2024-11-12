
const loginWith = async (page, username, password ) => {

    await page.getByPlaceholder('Username').fill(username)
    await page.getByPlaceholder('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()

}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'Add entry' }).click()
    await page.getByPlaceholder('title').fill(title)
    await page.getByPlaceholder('author').fill(author)
    await page.getByPlaceholder('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
}


const createAnotherBlog = async (page, title, author, url) => {
    await page.getByPlaceholder('title').fill(title)
    await page.getByPlaceholder('author').fill(author)
    await page.getByPlaceholder('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
}



export { loginWith, createBlog, createAnotherBlog}