/* eslint-disable no-unused-vars */
const dummy = (blog) => 1

const totalLikes = (blogs) => blogs.reduce((el, i) => el + i.likes, 0);

// eslint-disable-next-line func-names
const mostLikes = function (blogs) {
  const blogsArr = blogs.map((el) => el.likes)

  const maxEl = Math.max(...blogsArr)

  const findEl = blogs.filter((el) => el.likes === maxEl)

  return findEl
}

// eslint-disable-next-line func-names
const mostBlogs = function (blogs) {
  const blogsArr = blogs.map((el) => el.blogs)
  const maxEl = Math.max(...blogsArr)

  const findEl = blogs.filter((el) => el.blogs === maxEl)

  return findEl[0]
}

const favoriteBlog = (blogs) => {
  const blogsArr = blogs.map((el) => el.likes)

  const maxEl = Math.max(...blogsArr)

  const findEl = blogs.filter((el) => el.likes === maxEl)

  return findEl
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
  favoriteBlog
}
