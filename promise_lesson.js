window.lab = {};

window.lab.logger = console.log.bind(console);

window.lab.reset = function() {
	window.lab.one = function() {
		return Promise.resolve("Lab one complete.");
	};
	window.lab.two = function() {
		return Promise.reject("Lab two complete.");
	};
	window.lab.three = (function(n) {
		var arr = [];
		for(var i = 0; i < n; i++) {
			arr.push(Promise.resolve(Math.random() * 10));
		}
		return arr;
	}).bind(null, 10);
	window.lab.four = (function(n) {
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

window.lab.XHR = function(options) {
	/** DOC
	 *	Expects `options` object with attributes:
	 *		- url, a URL
	 *		- method, an HTTP method
	 *		- data, raw data to be sent in the request body
	 */

	var method = options.method || 'GET',
		data = options.data || null,
		url = options.url;

	return new Promise(function(resolve, reject) {
		if(!url)
			return reject("No URL specified.");

		var xhr = new XMLHttpRequest();
		xhr.open(method, url, true);

		xhr.addEventListener('load', function(e) {
			var status = e.target.status;

			if(status >= 400) {

				return reject(e.target.response);
			}

			resolve(e.target.response);
		});
		xhr.addEventListener('error', function(e) {
			// network-level errors only
			reject(e.target.error);
		});

		xhr.send(data);
	});
};

window.lab.testPromise = function(promise) {
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
window.lab.reset();
