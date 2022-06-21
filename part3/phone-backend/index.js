require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Phone = require('./models/phone')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))


// generate unique ids
// const generateIds = () => {
// 	const random = String(Math.random() * 9999)
// 	let cxx = random.split('.')
// 	let final = cxx.join('')

// 	return final
// }

app.get('/api/persons', async (req, res) => {
	const persons = await Phone.find()

	return res.status(200).json(persons)
})

app.get('/info', async (req, res) => {
	const persons = await Phone.find()
	const personsLength = persons.length

	res.status(200).send(`
        <h3> Phonebook has info for ${personsLength} people </h3> 
        <h3> ${new Date()}</h3>
    `)
})

app.get('/api/persons/:id', (req, res, next) => {

	Phone.findById(req.params.id).then((data) => {
		if (data) {
			res.status(200).json(data)
		} else {
			res.status(404).end()
		}

	}).catch((err) => {
		next(err)
	})
})

app.post('/api/persons', async (req, res, next) => {

	if (req.body === undefined) {
		return res.status(400).json({ error: 'content missing' })
	}

	const obj = {
		name: req.body.name,
		number: req.body.number,
	}

	// find if the obj exists in the db
	const exist = await Phone.find({ name: req.body.name })


	if (exist.length === 1) return next({ name: 'WrongHandler', statusCode: 400, message: 'Make use of the put request to update Phone' })

	console.log(obj)
	const phone = new Phone(obj)
	phone.save().then((data) => {
		res.status(200).json(data)
	}).catch(err => next(err))

})

app.put('/api/persons/:id', (req, res, next) => {
	const id = req.params.id

	const obj = { ...req.body }

	Phone.findByIdAndUpdate(id, obj, {
		new: true,
		runValidators: true,
		context: 'query'
	}).then((data) => {
		res.json(data)
	}).catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
	const id = req.params.id

	Phone.findByIdAndRemove(id).then(() => {
		res.status(204).end()
	}).catch(err => next(err))

})

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {

	if (err.name === 'CastError') {
		return res.status(500).send({ error: 'malformed id' })
	} else if (err.name === 'ValidationError') {
		return res.status(500).json({ error: err.message })
	} else if (err.name === 'MongoServerError') {
		return res.status(500).json({ error: err.message })
	} else if (err.name === 'WrongHandler') {
		return res.status(500).json({ error: err })
	}

	next(err)
}


app.use(errorHandler)


const port = process.env.PORT || 3001
app.listen(port, () => {
	console.log(`application has started on port ${port}`)
})

