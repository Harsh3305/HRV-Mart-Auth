const router = require("express").Router()
const { isUser } = require("./../../middleware/authenticate");


router.get("/", isUser, async (req, res) => {

})
module.exports = router;