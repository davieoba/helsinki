require("dotenv").config({
	path: "./../.env",
});

const fs = require("fs");
const mongoose = require("mongoose");
const Blog = require("./../models/blog");

const data = JSON.parse(fs.readFileSync("./dev_data.json", "utf-8"));

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("connected to DB");
	})
	.catch((err) => {
		console.log(err);
		console.log("error connecting to the DB");
	});

const deleteData = async () => {
	try {
		await Blog.deleteMany();

		console.log("data deleted successfully");
	} catch (err) {
		console.log(err);
	}

	process.exit();
};

const createData = async () => {
	try {
		const blog = await Blog.create(data);

		console.log("data imported successfully");
	} catch (err) {
		console.log(err);
	}

	process.exit();
};

if (process.argv[2] === "--delete") {
	deleteData();
} else if (process.argv[2] === "--import") {
	createData();
}
