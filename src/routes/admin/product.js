const router = require("express").Router();
const { isAdmin } = require("./../../middleware/authenticate");
const { postRequest } = require("./../../networking/backendCall");

router.post("/", isAdmin, (req, res) => {
    postRequest(
        "products",
        req.body,
        { 'Content-Type': 'application/json' },
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