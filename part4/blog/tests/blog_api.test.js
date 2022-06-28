const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const url = '/api/blogs'

beforeEach(async () => {
  await Blog.deleteMany()

  const blogObj = helper.initialBlog.map((el) => new Blog(el))
  const promiseArray = blogObj.map((el) => el.save())
  await Promise.all(promiseArray)
}, 100000)

describe('when at init some notes are saved', () => {
  test('blogs are returned as json', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body).toHaveLength(helper.initialBlog.length)
  })

  test('a specific blog can be viewed', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToView = blogAtStart[0]

    const resultNote = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedNote = JSON.parse(JSON.stringify(blogToView))

    expect(resultNote.body).toEqual(processedNote)
  })

  // ex
  test('unique identifier is id', async () => {
    const data = await api
      .get(url)
    data.body.forEach((el) => {
      expect(el.id).toBeDefined()
    })
  })
})

describe('deleting a specific blog', () => {
  // ex
  test('a specific blog can be deleted', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToDelete = blogAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogAtEnd = await helper.blogsInDb()

    expect(blogAtEnd).toHaveLength(helper.initialBlog.length - 1)

    const contents = blogAtEnd.map((r) => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('no likes', async () => {
  // ex
  test('default to zero', async () => {
    const testData = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
    }
    await api
      .post(url)
      .send(testData)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const data = await api.get(url)

    const res = data.body.map((el) => el.title)

    expect(res).toContain('TDD harms architecture')
  })
})

describe('a blog will not save', () => {
  // ex
  test('a blog without title and url will not save', async () => {
    const testData = {
      likes: 1,
      author: 'George Orwell'
    }

    await api
      .post(url)
      .send(testData)
      .expect(400)

    const res = await helper.blogsInDb()

    expect(res.length).isEqual(helper.initialBlog.length)
  })
})

describe('a valid blog', () => {
  // ex
  test('succeeds with all the required values', async () => {
    const testData = {
      title: 'TDD harms architecture',
      author: 'Johnny Bravo',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 1,
    }

    await api
      .post(url)
      .send(testData)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await helper.blogsInDb()
    const titles = res.map((el) => el.title)

    expect(res.length).toBe(helper.initialBlog.length + 1)
    expect(titles).toContain('TDD harms architecture')
  })
})

afterAll(() => {
  mongoose.connection.close()
})

// running test
// npm test -- tests/note_api.test.js
// or The -t option can be used for running tests with a specific name
// npm test -- -t "create a note without title will not save"
