function getSecret(key) {
    return process.env[key] || "3000"
}
module.exports = { getSecret }