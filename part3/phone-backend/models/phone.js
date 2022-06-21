const mongoose = require('mongoose')
require('dotenv').config({
	path: './.env'
})

const url = process.env.MONGODB_URI

// console.log(url)

mongoose.connect(url).then(() => {
	console.log('server connected to MONGODB')
}).catch((err) => {
	console.log(`error connecting to the DB, ${err.message}`)
})

const phoneSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		unique: true
	},
	number: {
		type: String,
		minLength: 8,
		validate: {
			validator: function (val) {
				// console.log(val)
				const regex = /\d{2,3}-[\d{3}\d{4}]{8,}$/g
				const bool = regex.test(val)
				// console.log(bool)
				return bool
			},
			message: val => {
				// console.log(val)
				return `${val.value}, This is not a valid phone number`
			}
		}
	}
})

phoneSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Phone = mongoose.model('Phone', phoneSchema)

module.exports = Phone


/*
09-1234556
040-22334455
21-23456789987654
22-01918902883028
*/

// regex ==> /[\d{2,3}-\d{3}\d{4}]{8,}$/g

// \d{2,3}-[\d{3}\d{4}]{8,}$

// /\d{2,3}-[\d{3}\d{4}]{8,}$/g