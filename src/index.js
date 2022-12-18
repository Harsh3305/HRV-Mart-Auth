const express = require("express");
const cors = require("cors");
const { json } = require("express")
const authRoute = require("./routes/auth");
const userProfileRoute = require("./routes/user/userProfile");
const userCartRoute = require("./routes/user/cart");
const { getSecret } = require("./secretManager/secret")
require('dotenv').config();

const app = express();

app.use(cors());
app.use(json());
app.use("", authRoute);
app.use("", userProfileRoute);
app.use("/user/cart", userCartRoute);

app.listen(getSecret("PORT"), (error) => {
	if (error) {
		console.error(error);
	}
	console.log("Backend is started");
});
