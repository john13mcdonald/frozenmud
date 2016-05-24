
var fs = require('fs');

exports.process = function(command, text, pathname, response) {
	/*
    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            response.writeHead(301, {
                Location: '/error'
            });
            response.end()
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            var content = data.toString()
			*/
            fs.readFile("private/main.html", function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    var frame = data.toString();
                    frame = frame.replace("<<content/>>", text)
                    response.end(frame)
                }
            })
			/*
        }
    });
	*/
}