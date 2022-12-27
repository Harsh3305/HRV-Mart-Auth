const router = require("express").Router()
const { isUser } = require("./../../middleware/authenticate");
const { getRequest, putRequest, deleteRequest } = require("./../../networking/backendCall");

router.get("/", isUser, async (req, res) => {
    const path = `cart/${req.user.userId}`;
    const body = {};
    const headers = {}
    getRequest(
        path,
        body,
        headers,
        (error, result) => {
            if (error) {
                res.status(404).send("Cart not found");
            }
            else {
                res.status(200).json(JSON.parse(result));
            }
        }
    );
});
router.get("/cost", isUser, (req, res) => {
    const userId = req.user.userId;
    const path = `cart/cost/${userId}`;
    const body = {};
    const header = {};

    getRequest(
        path,
        body,
        header,
        (error, result) => {
            if (error) {
                res.status(error.statusCode).send(error.body)
            }
            else {
                res.status(200).send(result)
            }
        }
    );
});
router.put("/", isUser, (req, res) => {
    const userId = req.user.userId;
    const products = req.body.products;

    const path = `cart`;
    const body = {
        user_id: userId,
        products: products
    }
    const headers = {
        'Content-Type': 'application/json'
    }
    putRequest(
        path,
        body,
        headers,
        (error, result) => {
            if (error) {
                res.status(500).send("Something went wrong");
            }
            else {
                res.status(200).send(result)
            }
        }
    )
});
router.put("/product", isUser, (req, res) => {
    const userId = req.user.userId;
    const path = `cart/${userId}`;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    const headers = {
        'Content-Type': 'application/json'
    }

    const body = {
        productId: productId,
        quantity: quantity
    }

    putRequest(
        path,
        body,
        headers,
        (error, result) => {
            if (error) {
                res.status(500).send("Something went wrong");
            }
            else {
                res.status(200).json(result)
            }
        }
    )
});
router.get("/purchase", isUser, (req, res) => {
    const userId = req.user.userId;

    const path = `cart/purchase/${userId}`;
    const body = {};
    const headers = {};

    getRequest(
        path,
        body,
        headers,
        (error, result) => {
            if (error) {
                res.status(500).send("Something went wrong");
            }
            else {
                res.status(200).send(result);
            }
        }
    )
});
router.delete("/", isUser, (req, res) => {
    const userId = req.user.userId;
    const productId = req.query.productId;
    /**
     * TODO: 
     */
    const path = `cart/${userId}?productId=${productId}`
    const body = {};
    const headers = {};

    deleteRequest(
        path,
        body,
        headers,
        (error, result) => {
            if (error) {
                res.status(500).send("Something went wrong");
            }
            else {
                res.status(200).send(result);
            }
        }
    )

})
module.exports = router;