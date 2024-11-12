import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


describe('<Blog />', () => {
  test('intially url is not shown', () => {

    const blog = {
      author: 'jose',
      title: 'Testear es lo mejor',
      url: 'url verdadera de la buena',
      likes: 34,
      user: {
        username:'jose',
      }
    }

    const user = {
      username:'jose'
    }

    const { container } = render(<Blog blog={blog} user={user} />)
    const element = container.querySelector('.initially-hidden')
    expect(element).toHaveStyle('display: none')
  })

  test('after click, url is shown', async () => {

    const blog = {
      author: 'jose',
      title: 'Testear es lo mejor',
      url: 'url verdadera de la buena',
      likes: 34,
      user: {
        username:'jose',
      }
    }
    const user = {
      username:'jose'
    }

    const browserUser = userEvent.setup()

    const { container } = render(<Blog blog={blog} user={user} />)
    const showBtn = screen.getByText('View')
    await browserUser.click(showBtn)
    const element = container.querySelector('.initially-hidden')
    expect(element).not.toHaveStyle('display: none')

  })

  test('click on like button works', async () => {
    const blog = {
      author: 'jose',
      title: 'Testear es lo mejor',
      url: 'url verdadera de la buena',
      likes: 34,
      user: {
        username:'jose',
      }
    }
    const user = {
      username:'jose'
    }

    const mockHandler = vi.fn()
    const browserUser = userEvent.setup()

    const { container } = render(<Blog blog={blog} user={user} handleLike={mockHandler} />)
    const likeBtn = screen.getByText('Like')
    await browserUser.click(likeBtn)
    await browserUser.click(likeBtn)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})


