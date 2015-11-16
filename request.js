var http = require('http');

var pRequest = function promiseyRequest(options) {
    'use strict';

    return new Promise(function(resolve, reject) {
        var resData = '';
        var req = http.request({
            host : options.host,
            port : options.port || 80,
            path : options.path || '/',
            headers : options.headers || {}
        });
        req.on('error', function(err) {
            reject(err);
        });
        req.on('data', function(data) {
            resData += data;
        });
        req.on('end', function() {
            resolve(resData);
        });
    });
};

module.exports = pRequest;
