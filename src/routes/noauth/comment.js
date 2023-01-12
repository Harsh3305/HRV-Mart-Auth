const router = require("express").Router();
const { getRequest } = require("./../../networking/backendCall");
router.get("/product/:id", (req, res) => {
    getRequest(
        `comment${req.url}`,
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
router.get("/comment/:id", (req, res) => {
    getRequest(
        `comment${req.url}`,
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