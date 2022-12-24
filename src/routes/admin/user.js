const router = require("express").Router();
const { isAdmin } = require("./../../middleware/authenticate");
const { getRequest } = require("./../../networking/backendCall");

router.get("/restrict/:emailId", isAdmin, (req, res) => {
    getRequest(
        `auth${req.url}`,
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