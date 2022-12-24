const express = require("express");
const cors = require("cors");
const { json } = require("express")
const authRoute = require("./routes/auth");
const userProfileRoute = require("./routes/user/userProfile");
const userCartRoute = require("./routes/user/cart");
const userCommentRouter = require("./routes/user/comment");
const userLikeRouter = require("./routes/user/like");
const userRatingRouter = require("./routes/user/rating");
const noAuthProductRouter = require("./routes/noauth/product");
const noAuthCommentRouter = require("./routes/noauth/comment");
const noAuthLikeRouter = require("./routes/noauth/like");
const noAuthRatingRouter = require("./routes/noauth/rating");

require('dotenv').config();

const app = express();

app.use(cors());
app.use(json());
app.use("", authRoute);
app.use("", userProfileRoute);
app.use("/user/cart", userCartRoute);
app.use("/products", noAuthProductRouter);
app.use("/comment", userCommentRouter);
app.use("/comment", noAuthCommentRouter);
app.use("/like", userLikeRouter);
app.use("/like", noAuthLikeRouter);
app.use("/rating", userRatingRouter);
app.use("/rating", noAuthRatingRouter);

app.listen(3000, (error) => {
	if (error) {
		console.error(error);
	}
	console.log("Backend is started");
});
