const express = require("express");
const cors = require("cors");
const { json } = require("express")
const authRoute = require("./routes/auth");
const homeRoute = require("./routes/user/home");
const { getSecret } = require("./secretManager/secret")
require('dotenv').config();

const app = express();

app.use(cors());
app.use(json());
app.use("", authRoute);
app.use("", homeRoute);

app.listen(getSecret("PORT"), (error) => {
	if (error) {
		console.error(error);
	}
	console.log("Backen is started");
});
