function getSecret(key) {
    return process.env[key] || "Secret not found"
}
module.exports = { getSecret }