const mongoose = require('mongoose')
require('dotenv').config({
	path: './.env'
})

const phoneSchema = new mongoose.Schema({
	name: String,
	number: String,
})
const Phone = mongoose.model('Phone', phoneSchema)

if (process.argv.length < 3) {
	console.log('Please provide a password as an argument: node mongo.js <password>')
	process.exit(1)
}

const url = process.env.MONGODB_DB.replace('<password>', process.env.MONGODB_PASS)

mongoose.connect(url).then(() => {
	console.log('connected')

	if (process.argv.length === 3) {
		Phone.find().then((res) => {
			res.forEach((el) => {
				console.log(el.name, el.number)
			})
			return mongoose.connection.close()
		})
		return
	}

	const person = new Phone({
		name: process.argv[3],
		number: process.argv[4]
	})

	person.save().then((data) => {
		console.log(`added ${data.name} number ${data.number} to phonebook`)
		return mongoose.connection.close()
	})
}).catch((err) => console.log(err))



