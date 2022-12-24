const router = require("express").Router();
const { isUser } = require("./../../middleware/authenticate");
const { deleteRequest, getRequest, postRequest, putRequest } = require("./../../networking/backendCall");

router.get("/:commentId", isUser, (req, res) => {
    getRequest(
        `/vote/${req.user.userId}/${req.params.commentId}`,
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
router.post("/", isUser, (req, res) => {
    postRequest(
        "",
        {
            "userId": req.user.userId,
            "commentId": req.body.commentId,
            "type": req.body.type
        },
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
router.put("/", isUser, (req, res) => {
    putRequest(
        "",
        {
            "userId": req.user.userId,
            "commentId": req.body.commentId,
            "type": req.body.type
        },
        { 'Content-Type': 'application/json' },
        (error, result) => {

        }
    );
});
router.delete("/:commentId", isUser, (req, res) => {
    deleteRequest(
        `/vote/${req.user.userId}/${req.params.commentId}`,
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