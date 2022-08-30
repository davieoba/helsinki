import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

/*

Make a test which checks that the component displaying a blog renders the blog's title and author, but does not render its url or number of likes by default.

Add CSS-classes to the component to help the testing as necessary.

*/
test('renders Blog title and author', () => {
  const blog = {
    author: 'David Bodunrin',
    title: 'This is a test blog'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('David Bodunrin')
  expect(element).toBeDefined()
})