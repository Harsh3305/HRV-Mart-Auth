const router = require("express").Router();
const { deleteRequest, postRequest, putRequest, getRequest } = require("./../../networking/backendCall");
const { isUser } = require("./../../middleware/authenticate");
router.post("/", isUser, (req, res) => {
    postRequest(
        `rating`,
        {
            "userId": req.user.userId,
            "productId": req.body.productId,
            "rating": req.body.rating,
            "description": req.body.description
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
        'rating',
        {
            "userId": req.user.userId,
            "productId": req.body.productId,
            "rating": req.body.rating,
            "description": req.body.description
        },
        { 'Content-Type': 'application/json' },
        (error, result) => {

        }
    );
});
router.get("/getUserRating/:productId", (req, res) => {
    getRequest(
        `rating/${req.params.productId}/${req.body.userId}`,
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
        `${req.params.productId}/${req.user.userId}`,
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