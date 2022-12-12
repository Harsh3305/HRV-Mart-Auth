const express = require("express");
const authRoute = require("./routes/auth");
require('dotenv').config();

const app = express();

app.use("", authRoute);

app.listen(process.env.PORT, (error) => {
	if (error) {
		console.error(error);
}
    	console.log("Backen is started");
});
