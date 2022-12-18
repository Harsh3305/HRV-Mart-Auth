var axios = require('axios');
var request = require('request');
const { getSecret } = require("./../secretManager/secret")

async function fetchData(path, body, headers, type, next) {
    var config = {
        method: type,
        url: `${getSecret("BACKEND_URL")}/${path}`,
        headers: headers,
        body: JSON.stringify(body)
    };
    request(config, function (error, response) {
        if (error || response.statusCode != 200) {
            if (error == null) {
                error = {};
            }
            error.response = {
                statusCode: response.statusCode,
                body: response.body
            };
            next(error, null);
        }
        else {
            next(null, response.body);
        }
    });

}

async function getRequest(path, body, headers, next) {
    fetchData(
        path,
        body,
        headers,
        "GET",
        next
    )
}

async function postRequest(path, body, headers, next) {
    fetchData(
        path,
        body,
        headers,
        "POST",
        next
    )
}

async function putRequest(path, body, headers, next) {
    fetchData(
        path,
        body,
        headers,
        "PUT",
        next
    )
}

async function deleteRequest(path, body, headers, next) {
    fetchData(
        path,
        body,
        headers,
        "DELETE",
        next
    )
}

module.exports = { getRequest, postRequest, putRequest, deleteRequest }