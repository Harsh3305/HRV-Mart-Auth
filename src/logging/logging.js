function logMessage(user, path, message, mapping) {
    console.log({
        user: user,
        message: message,
        path: path,
        mapping: mapping
    });
}
function warnMessage(user, path, warn, mapping) {
    console.warn({
        user: user,
        warn: warn,
        path: path,
        mapping: mapping
    });
}
function errorMessage(user, path, error, mapping) {
    console.error({
        user: user,
        error: error,
        path: path,
        mapping: mapping
    });
}

module.exports = { logMessage, warnMessage, errorMessage };