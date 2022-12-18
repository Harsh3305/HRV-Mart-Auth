function getSecret(key) {
    return process.env[key] || "NO SECRET"
}
module.exports = { getSecret }