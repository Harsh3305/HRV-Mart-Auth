const express = require("express");
const authRoute = require("./routes/auth");
const homeRoute = require("./routes/home");
require('dotenv').config();

const app = express();

app.use("", authRoute);
app.use("", homeRoute);

app.listen(process.env.PORT, (error) => {
	if (error) {
		console.error(error);
}
    	console.log("Backen is started");
});
