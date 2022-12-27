const { getRequest } = require("../../networking/backendCall");
const { isUser } = require("./../../middleware/authenticate");
const router = require("express").Router();

router.get("/", isUser, (req, res) => {
    getRequest(
        `order/${req.user.userId}${req.url}`,
        {},
        {},
        (error, result) => {
            if (error) {
                res.status(500).send(error)
            }
            else {
                res.status(200).json(JSON.parse(result));
            }
        }
    );
});
module.exports = router;