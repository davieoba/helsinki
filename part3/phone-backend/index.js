const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.static('build'))


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
    {
        "id": 5,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// generate unique ids 
const generateIds = () => {
    const random = String(Math.random() * 9999)
    let cxx = random.split('.')
    let final = cxx.join('')

    return final
}


app.get('/api/persons', (req, res) => {
    res.status(200).json(persons)
})

app.get('/info', (req, res) => {
    const personsLength = persons.length

    res.status(200).send(`
        <h3> Phonebook has info for ${personsLength} people </h3> 
        <h3> ${new Date()}</h3>
    `)
})

app.get('/api/persons/:id', (req, res) => {

    const id = Number(req.params.id)

    const data = persons.find((el) => {
        return el.id === id
    })

    if (!data) {
        return res.status(404).send({ error: ' not found' })
    }

    res.status(200).json(data)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    persons = persons.filter((el) => {
        return el.id !== id
    })

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const id = generateIds()

    const obj = {
        name: req.body.name,
        number: req.body.number,
        id
    }

    // check if the data exists
    const exist = persons.find((el) => {
        return el.name === obj.name
    })

    if (exist) {
        return res.status(400).send({ error: 'name must be unique' })
    }

    if (obj.number === '' || obj.name === '') {
        return res.status(400).josn({ error: 'Name or number data is missing' })
    }

    persons = persons.concat(obj)

    res.status(200).json(obj)
})


const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`application has started on port ${port}`)
})