const router = require("express").Router();
const { postRequest, getRequest, putRequest } = require("./../../networking/backendCall");
const { isUser } = require("./../../middleware/authenticate");
router.post("/comment", isUser, (req, res) => {
    const body = req.body;
    try {
        if (body.userId != req.user.userId) {
            res.status(400).send("You are not allowed to do that");
        }
    }
    catch (e) {
        res.status(500).send("Internal Server Error")
    }
    const header = {
        'Content-Type': 'application/json'
    };
    const path = `comment/comment`;
    postRequest(
        path,
        body,
        header,
        (error, result) => {
            if (error) {
                res.status(500).send("Internal Server Error")
            }
            else {
                res.status(200).json(JSON.parse(result));
            }
        }
    );
});
router.post("/product", isUser, (req, res) => {
    const body = req.body;
    try {
        if (body.userId != req.user.userId) {
            res.status(400).send("You are not allowed to do that");
        }
    }
    catch (e) {
        res.status(500).send("Internal Server Error")
    }
    const header = {
        'Content-Type': 'application/json'
    };
    const path = `comment/product`;
    postRequest(
        path,
        body,
        header,
        (error, result) => {
            if (error) {
                res.status(500).send("Internal Server Error")
            }
            else {
                res.status(200).json(JSON.parse(result));
            }
        }
    );
});
router.put("/", isUser, (req, res) => {
    const body = req.body;
    try {
        if (body.userId != req.user.userId) {
            res.status(400).send("You are not allowed to do that");
        }
    }
    catch (e) {
        res.status(500).send("Internal Server Error")
    }
    const header = {
        'Content-Type': 'application/json'
    };
    const path = `comment/product`;
    putRequest(
        path,
        body,
        header,
        (error, result) => {
            if (error) {
                res.status(500).send("Internal Server Error")
            }
            else {
                res.status(200).json(JSON.parse(result));
            }
        }
    );
});
module.exports = router;