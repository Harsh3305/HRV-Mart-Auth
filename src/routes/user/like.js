const { getRequest, postRequest, deleteRequest } = require("../../networking/backendCall");
const { isUser } = require("./../../middleware/authenticate");
const router = require("express").Router();

router.post("/", isUser, (req, res) => {
    const path = `like${req.url}`;
    postRequest(
        path,
        {
            userId: req.user.userId,
            productId: req.body.productId
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
router.get("/", isUser, (req, res) => {
    getRequest(`like/allLikes/${req.user.userId}${req.url}`,
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
router.get("/:productId", isUser, (req, res) => {
    getRequest(
        `like/${req.user.userId}/${req.params.productId}`,
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
router.delete("/:productId", isUser, (req, res) => {
    deleteRequest(
        `like/${req.user.userId}/${req.params.productId}`,
        {},
        {},
        (error, result) => {
            if (error) {
                res.status(500).send(error)
            }
            else {
                res.status(200).send("Like remove successfully");
            }
        }
    );
});
module.exports = router;