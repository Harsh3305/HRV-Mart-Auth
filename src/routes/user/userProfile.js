const { isUser } = require("../../middleware/authenticate");
const { getRequest } = require("../../networking/backendCall")
const router = require("express").Router();

router.get("", isUser, async (req, res) => {
    const userId = req.user.userId;
    const path = `user/${userId}`;
    const headers = {}
    const body = {}
    getRequest(
        path,
        body,
        headers,
        (error, result) => {
            if (error) {
                if (error.statusCode == 404) {
                    res.status(404).send("User not found");
                }
                else {
                    res.status(error.statusCode).json({ error: error.body })
                }
            }
            else {
                res.status(200).json(JSON.parse(result));
            }
        }
    )
    res.status(200).send(req.user)
})

module.exports = router;