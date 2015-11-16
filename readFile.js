var fs = require('fs');
var path = require('path');

var pReadFile = function promiseyReadFile(filePath) {
    'use strict';

    return new Promise(function(resolve, reject) {
        var readStream = fs.createReadStream(path.resolve(filePath));
        var result = '';
        readStream.on('error', function(err) {
            reject(err);
        });
        readStream.on('data', function(data) {
            result += data;
        });
        readStream.on('end', function() {
            resolve(result);
        });
    });
};

module.exports = pReadFile;
