

var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs')

app.listen(880);

function handler (req, res) {
    fs.readFile(__dirname + '/client.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading client.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

console.log("Starting");
io.set('log level','1');

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });

    //The host player has sent region data.

    socket.on('hostRegionState',function(data){
        var strData=JSON.stringify(data);
        console.log("data");
        //socket.emit('regionState',data);
        io.sockets.emit('regionState',strData);
    });


});



