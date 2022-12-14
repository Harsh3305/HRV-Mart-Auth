const router = require("express").Router();
const crypto = require('crypto');
const axios = require("axios");
const jwt = require("jsonwebtoken");
const PASSWORD_INVALID = "Password is too short"
const EMAIL_INVALID = "Email id is not valid"

router.post("/login", async (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    if (!passwordValidator(password)) {
        res.status(500).send(PASSWORD_INVALID)
    }
    else if (!emailValiator(email)) {
        res.status(500).send(EMAIL_INVALID)
    }
    else {
        const hashPassword = generateHashedPassword(password)
        // Send email and password to backend server to login
        const data = JSON.stringify({
            "email": email,
            "hashedPassword": hashPassword
        });
        const config = {
            method: 'post',
            url: `${process.env.BACKEND_URL}/auth/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                const result = JSON.stringify(response.data);
                if (result == "false") {
                    res.status(400).send("Login Failed")
                }
                else {
                    // Create JWT and send it to user
                    const token = createJWT(email)
                    res.status(200).json(
                        {
                            jwt: token
                        }
                    )
                }
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).send(error.message);
            });
    }
})
router.post("/signUp", async (req, res) => {
    const password = req.body.password;
    const email = req.body.email;

    if (!passwordValidator(password)) {
        res.status(500).send(PASSWORD_INVALID)
    }
    else if (!emailValiator(email)) {
        res.status(500).send(EMAIL_INVALID)
    }
    else {
        const hashPassword = generateHashedPassword(password)
        // Send email and password to backend server to sign up
        const data = JSON.stringify({
            "email": email,
            "hashedPassword": hashPassword
        });
        const config = {
            method: 'post',
            url: `${process.env.BACKEND_URL}/auth/signUp`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(response)
                res.status(200).send("User created successfully");
            })
            .catch(function (error) {
                console.log(error)
                res.status(500).send("Unable to create user with given credentials");
            });
    }
})
function createJWT(userId) {
    const token = jwt.sign({
        userId: userId
    },
        process.env.JWT_SECRETE,
        {
            expiresIn: "1m",
            issuer: "HRV-Mart",
        }
    )
    return token
}
function passwordValidator(password) {
    if (password == null || password.length < 8) {
        return false
    }
    else {
        return true
    }
}
function emailValiator(email) {
    if (email == null || email.split("@").length != 2) {
        return false
    }
    else {
        return true
    }
}
function generateHashedPassword(password) {
    return crypto.createHash("sha256", process.env.HASH_SECRETE)
        .update(password)
        .digest("hex");
}
module.exports = router;