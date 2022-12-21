const router = require("express").Router();
const { getRequest } = require("./../../networking/backendCall");

router.get("/", (req, res) => {
    getRequest(
        `products${req.url}`,
        {},
        {},
        (error, result) => {
            if (error) {
                res.status(error.response.statusCode).send(error.response.body);
            }
            else {
                res.status(200).send(result);
            }
        }
    );
});
router.get("/search", (req, res) => {
    // console.log(req);
    getRequest(
        `products/search?query=${req.query.query}`,
        {},
        {},
        (error, result) => {
            if (error) {
                res.status(error.response.statusCode).send(error.response.body);
            }
            else {
                res.status(200).send(result);
            }
        }
    );
});
router.get("/:id", (req, res) => {
    getRequest(
        `products/${req.params.id}`,
        {},
        {},
        (error, result) => {
            if (error) {
                res.status(error.response.statusCode).send(error.response.body);
            }
            else {
                res.status(200).send(result);
            }
        }
    );
});
router.get("/categories", (req, res) => {
    getRequest(
        "products/categories",
        {},
        {},
        (error, result) => {
            if (error) {
                res.status(error.response.statusCode).send(error.response.body);
            }
            else {
                res.status(200).send(result);
            }
        }
    );
});
router.get("/category/:id", (req, res) => {
    getRequest(
        `products${req.url}`,
        {},
        {},
        (error, result) => {
            if (error) {
                res.status(error.response.statusCode).send(error.response.body);
            }
            else {
                res.status(200).send(result);
            }
        }
    );
});
module.exports = router;