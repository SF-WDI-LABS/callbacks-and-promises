'use strict';

var labObject = {};

labObject.logger = console.log.bind(console);

labObject.reset = function() {
	labObject.one = function() {
		return Promise.resolve("Lab one complete.");
	};
	labObject.two = function() {
		return Promise.reject("Lab two complete.");
	};
	labObject.three = (function(n) {
		var arr = [];
		for(var i = 0; i < n; i++) {
			arr.push(Promise.resolve(Math.random() * 10));
		}
		return arr;
	}).bind(null, 10);
	labObject.four = (function(n) {
		var arr = [];
		for(var i = 0; i < n; i++) {
			arr.push(new Promise(function(resolve, reject) {
				var delay = Math.ceil(Math.random() * 1000);
				setTimeout(function() {
					resolve(delay);
				}, 500 + delay);
			}));
		}
		return arr;
	}).bind(null, 10);
	console.log("Labs reset.");
};

labObject.testPromise = function(promise) {
	// expects a promise containing a string matching a particular regex
	var pattern = /[A-Za-z]+(\s[A-Za-z]+)+\s?/;

	promise.then(function(result) {
		if(result.match && result.match(pattern)) {
			return result;
		}

		throw new Error("Bad string: " + result);
	}).then(function(result) {
		console.log("Good string: " + result);
	}).catch(function(err) {
		console.error(err);
	});
};

// init
labObject.reset();

module.exports = labObject;

