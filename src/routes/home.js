const { isAuthenticated } = require("../middleware/authenticate");

const router = require("express").Router();

router.get("", isAuthenticated, async (req, res) => {
    res.status(200).send(req.user)
})

module.exports = router;