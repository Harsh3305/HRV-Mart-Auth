const { verify } = require("jsonwebtoken")

const BEARER = "bearer";
const INVALID_TOKEN = "Please send a valid token";

function isAuthenticated(req, res, next) {
    try {
        const token = req.headers.authentication;
        const divider = ":";
        const jwt = token.split(divider)[1];
        const methord = token.split(divider)[0];

        if (methord != BEARER) {
            res.status(401).send(`Please use ${BEARER} as authenitcation type`);
        }
        else if (jwt == "") {
            res.status(401).send(INVALID_TOKEN);
        }
        else {
            verify(jwt, process.env.JWT_SECRET, (error, decodedMessage) => {
                if (error || decodedMessage == "") {
                    console.error(error)
                    res.status(400).send(INVALID_TOKEN);
                }
                else {
                    req.user = {
                        userId: decodedMessage.userId,
                        type: decodedMessage.type
                    };
                    next();
                }
            })
        }
    }
    catch (error) {
        res.status(401).send(INVALID_TOKEN)
    }

}
module.exports = { isAuthenticated }