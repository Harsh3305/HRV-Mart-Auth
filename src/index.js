const express = require("express");
const userRoute = require("./routes/user/User");
require('dotenv').config();

const app = express();

app.use("", userRoute);

app.listen(process.env.PORT, (error) => {
	if (error) {
		console.error(error);
}
    	console.log("Backen is started");
});
