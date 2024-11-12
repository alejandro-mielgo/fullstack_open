import { render, screen } from '@testing-library/react'
import SubmitForm from './SubmitForm'
import userEvent from '@testing-library/user-event'

describe('<SubmitForm />', () => {
  test('Submit new blog entry', async () => {

    const mockHandler = vi.fn()
    const browserUser = userEvent.setup()

    render(<SubmitForm handleSubmit={mockHandler} setBlogs={mockHandler}  />)

    const createBtn = screen.getByText('create')
    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')

    await browserUser.type(titleInput, 'test title')
    await browserUser.type(authorInput, 'test author')
    await browserUser.type(urlInput, 'test url')
    await browserUser.click(createBtn)
  })
})