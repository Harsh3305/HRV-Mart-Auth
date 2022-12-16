const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth");
const homeRoute = require("./routes/home");
const { json } = require("express");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(json());
app.use("", authRoute);
app.use("", homeRoute);

app.listen(process.env.PORT, (error) => {
	if (error) {
		console.error(error);
	}
	console.log("Backen is started");
});
