var fs = require('fs');

exports.process = function(command, text, pathname, response) {
	fs.readFile("editable_pages/frame.html", function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    var frame = data.toString();
                    frame = frame.replace("<<content/>>", text)
                    response.end(frame)
                }
            })
}