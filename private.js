var http = require("http");
var fs = require('fs');
var url = require('url');

http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;

    if (pathname === "/") {
        response.writeHead(301, { // Go home.
            Location: '/home'
        });
        response.end()
    } else if (pathname.indexOf("private") > -1) { // For security
        response.writeHead(301)
        response.end()
    } else if (pathname.indexOf(".") > -1) { // Probably .css, .jpeg...
        fs.readFile(pathname.substr(1), function(err, data) {
            if (err) {
                response.writeHead(301, {
                    Location: '/error'
                });
                response.end()
            } else {
                response.end(data.toString())
            }
        });
    } else { // Ok, now we have something interesting.
        fs.readFile(pathname.substr(1), function(err, data) {
			consloe.log("Hi, there..")
            if (err) {
                response.writeHead(301, {
                    Location: '/error'
                });
                response.end()
            } else {
                var text = data.toString()
                var position = text.indexOf('\n');
                if (position != -1) {
                    var first = text.slice(0, position)
                    var rest = text.substr(position + 1);
					try {
						var interpreter = require(first)
						interpreter.process(first, rest, pathname, response)
						conslole.log("Successful request!")
					} catch(e)  {
						console.log(e)
					}
                } else  {
					response.writeHead(500)
					response.end()
				}
            }
        });
    }

}).listen(8081);

console.log('Server running.');
require('dns').lookup(require('os').hostname(), function(err, add, fam) {
    console.log("Current ip adress: " + add + ":8081");
})