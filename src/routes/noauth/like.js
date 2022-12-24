const { getRequest } = require("../../networking/backendCall");
const router = require("express").Router();

router.get("/allLikes/:id", (req, res) => {
    const path = `like${req.url}`;
    getRequest(
        path,
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