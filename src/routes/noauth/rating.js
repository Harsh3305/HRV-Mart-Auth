const router = require("express").Router();
const { getRequest } = require("./../../networking/backendCall");

router.get("/:productId", (req, res) => {
    getRequest(
        `rating${req.url}`,
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