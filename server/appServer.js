var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
  fs.readFile(path.resolve(__dirname + '/../app/index.html'), function(err, page) {
    if (err) response.send(404, 'Not found');
    else response.send(200, page);
  });
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');