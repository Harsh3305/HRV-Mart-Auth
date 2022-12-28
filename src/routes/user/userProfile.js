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
                    res.status(error.response.statusCode).json({ error: error.response })
                }
            }
            else {
                res.status(200).json(JSON.parse(result));
            }
        }
    )
})

module.exports = router;