/* eslint-disable no-unused-vars */
const dummy = (blog) => 1

const totalLikes = (blogs) => blogs.reduce((el, i) => el + i.likes, 0);

module.exports = {
  dummy,
  totalLikes
}
