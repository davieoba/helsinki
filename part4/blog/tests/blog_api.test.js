const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const url = '/api/blogs'

// const initialBlog = [
//   {
//     title: 'React patterns',
//     author: 'Michael Chan',
//     url: 'https://reactpatterns.com/',
//     likes: 7
//   },
//   {
//     title: 'Go To Statement Considered Harmful',
//     author: 'Edsger W. Dijkstra',
//     url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//     likes: 5
//   },
// ]

beforeEach(async () => {
  await Blog.deleteMany()
  let blogObj = new Blog(helper.initialBlog[0])

  await blogObj.save()

  blogObj = new Blog(helper.initialBlog[1])
  await blogObj.save()
}, 100000)

describe('test the blog api', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all notes are returned', async () => {
    const res = await api.get(url)

    expect(res.body).toHaveLength(helper.initialBlog.length)
  })

  test('a specific note is about React patterns', async () => {
    const res = await api.get(url)

    const titles = res.body.map((r) => r.title)
    expect(titles).toContain('React patterns')
  })

  test('a valid note can be added', async () => {
    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
    }

    await api.post(url)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await helper.blogsInDb()
    expect(res).toHaveLength(helper.initialBlog.length + 1)

    const titles = res.map((el) => el.title)
    expect(titles).toContain('TDD harms architecture')
  })

  test('blog without title will not save', async () => {
    // expect.assertions(1);
    const newObj = {
      author: 'yoo yoyo',
      url: 'www.google.com',
      likes: 0,
    }

    await api
      .post(url)
      .send(newObj)
      .expect(400)

    const res = await helper.blogsInDb()

    expect(res.length).toBe(helper.initialBlog.length)
    // expect(res[2].title).toContain('some title')
    // expect(res.body).toHaveLength(helper.initialBlog.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

// running test
// npm test -- tests/note_api.test.js
// or The -t option can be used for running tests with a specific name
// npm test -- -t "create a note without title will not save"
