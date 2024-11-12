const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, createAnotherBlog } = require('./helper')


describe('blog app', () => {

    beforeEach( async ({ page, request }) =>{
        await request.post(('http://localhost:3003/api/testing/reset'))
        await request.post('http://localhost:3003/api/users',{
            data: {
            username: "manolillo",
            name: "manolillo",
            password: "1234manolo1234"
            }
        })

        await request.post('http://localhost:3003/api/users',{
            data: {     
            username: "el_otro_molondro",
            name: "el_otro_molondro",
            password: "carambita"
            }
        })

        await page.goto('http://localhost:5173')
    })    

    test('login menu is shown', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {
        test('success with correct credentials', async ({page}) => {
            await loginWith(page, 'manolillo','1234manolo1234')
            await expect(page.getByText('Loged as: manolillo')).toBeVisible()
        })

        test('fail with wrong credentials', async ({page}) => {
            await loginWith(page, 'manolillo','wrong_password')
            await expect(page.getByText('wrong credentials')).toBeVisible()
        })
    })

    describe('When logged in',() => {
        beforeEach( async ({ page }) => {
            await loginWith(page, 'manolillo','1234manolo1234')
        })

        test ('a new blog can be created', async ({ page }) => {
            await createBlog(page, "blog 1","manolillo","http://manolillorules.com") 
            await expect(page.getByText('blog 1')).toBeVisible()       
        })

        test('a post can be liked', async ({ page }) => {
            await createBlog(page, "blog 1","manolillo","http://manolillorules.com") 
            await page.getByRole('button', { name: 'View' }).click()
            await expect(page.getByText('likes: 0')).toBeVisible() 
            await page.getByRole('button', { name: 'Like' }).click()
            await expect(page.getByText('likes: 1')).toBeVisible()  
        })

        test("the creator of the post can delete the entry", async ({ page }) =>{
            await createBlog(page, "blog 1","manolillo","http://manolillorules.com")
            await expect(page.getByText('blog 1')).toBeVisible()  
            await page.getByRole('button', { name: 'View' }).click()
            page.on('dialog', dialog => dialog.accept());
            await page.getByRole('button', { name: 'Remove' }).click()
            await expect(page.getByText('blog 1')).not.toBeVisible()             
        })

        test('other user cannot remove a post', async({ page }) => {
            await createBlog(page, "blog 1","manolillo","http://manolillorules.com") 
            await page.getByRole('button', { name: 'logut' }).click()
            await loginWith(page, 'el_otro_molondro','carambita')
            await page.getByRole('button', { name: 'View' }).click()
            await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()       
        })

        test('blogs are in order of likes', async ({ page }) => {
            await createBlog(page, "blog 1","manolillo","http://manolillorules.com")
            await createAnotherBlog(page, "blog 2","manolillo","http://manolillorules.com")
            await createAnotherBlog(page, "blog 3","manolillo","http://manolillorules.com")
            await expect(page.getByText('blog 3')).toBeVisible()  
            
  
            const blog3 = page.locator('.blog-item').filter({ hasText: 'blog 3' })

            //like only blog 3, which was last
            await blog3.getByRole('button', { name: 'View' }).click()
            await blog3.getByRole('button', { name: 'Like' }).click()
            await blog3.getByRole('button', { name: 'Like' }).click()

            await expect(page.locator('.blog-item').first()).toContainText('blog 3')

        })
    })

})

