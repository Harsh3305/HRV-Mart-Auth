const router = require("express").Router();
const crypto = require('crypto');
const { createJWT } = require("./../middleware/authenticate");
const { fetchData } = require("./../networking/backendCall");
const { getSecret } = require("../secretManager/secret");

const PASSWORD_INVALID = "Password is too short"
const EMAIL_INVALID = "Email ID is not valid"

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
        const data = {
            "email": email,
            "hashedPassword": hashPassword
        };
        const path = "auth/login"
        fetchData(
            path, data, {
            'Content-Type': 'application/json'
        }, 'POST',
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.status(500).status(error.message);
                }
                else {
                    if (result == "false") {
                        res.status(400).send("Login Failed")
                    }
                    else {
                        // Create JWT and send it to user
                        const token = createJWT(email)
                        res.status(200).json(
                            {
                                jwt: token,
                            }
                        )
                    }
                }
            }
        )
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
        const data = {
            "email": email,
            "hashedPassword": hashPassword
        };
        fetchData("auth/signUp", data, {
            'Content-Type': 'application/json'
        }, "POST", (error, result) => {
            if (error) {
                res.status(500).send("Unable to create user with given credentials");
            }
            else {
                res.status(200).send("User created successfully");
            }
        })
    }
})
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
    return crypto.createHash("sha256", getSecret("HASH_SECRET"))
        .update(password)
        .digest("hex");
}
module.exports = router;